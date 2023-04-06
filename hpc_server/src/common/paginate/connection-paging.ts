import { ArgsType, Field, Int, ObjectType, InputType } from "@nestjs/graphql";
import { Type } from "@nestjs/common";
import * as Relay from "graphql-relay";
import {
  Min,
  Validate,
  ValidateIf,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import {
  FindManyOptions,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
} from "typeorm";
import { getOffsetWithDefault, offsetToCursor } from "graphql-relay";
import { WhereInput } from "./where-input";
import { ApiProperty } from "@nestjs/swagger";

@ObjectType()
export class PageInfo {
  @ApiProperty({ nullable: true })
  hasNextPage: boolean | null;
  @ApiProperty({ nullable: true })
  hasPreviousPage: boolean | null;
  startCursor: string | null;
  endCursor: string | null;
  totalCount?: number | null;
}

@ObjectType({ isAbstract: true })
export abstract class Aggregate {
  @Field((_type) => Number)
  count: number;
}

@ValidatorConstraint({ async: false })
class CannotUseWithout implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as any;
    const required = args.constraints[0] as string;
    return object[required] !== undefined;
  }

  defaultMessage(args: ValidationArguments) {
    return `Cannot be used without \`${args.constraints[0]}\`.`;
  }
}

@ValidatorConstraint({ async: false })
class CannotUseWith implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as any;
    const result = args.constraints.every((propertyName) => {
      return object[propertyName] === undefined;
    });
    return result;
  }

  defaultMessage(args: ValidationArguments) {
    return `Cannot be used with \`${args.constraints.join("` , `")}\`.`;
  }
}

export class PaginationArgs {
  @Field((_type) => String, {
    nullable: true,
    description: "Paginate before opaque cursor",
  })
  @ValidateIf((o) => o.before !== undefined)
  @Validate(CannotUseWithout, ["last"])
  @Validate(CannotUseWith, ["after", "first", "offset", "limit"])
  before?: string;

  @Field((_type) => Int, {
    nullable: true,
    description: "Paginate after opaque cursor",
  })
  @ValidateIf((o) => o.after !== undefined)
  @Validate(CannotUseWithout, ["first"])
  @Validate(CannotUseWith, ["before", "last", "offset", "limit"])
  after?: string;

  @Field((_type) => Int, { nullable: true, description: "Paginate first" })
  @ValidateIf((o) => o.first !== undefined)
  @Min(1)
  @Validate(CannotUseWith, ["before", "last", "offset", "limit"])
  first?: number;

  @Field((_type) => Int, { nullable: true, description: "Paginate last" })
  @ValidateIf((o) => o.last !== undefined)
  // Required `before`. This is a weird corner case.
  // We'd have to invert the ordering of query to get the last few items then re-invert it when emitting the results.
  // We'll just ignore it for now.
  @Validate(CannotUseWithout, ["before"])
  @Validate(CannotUseWith, ["after", "first", "offset", "limit"])
  @Min(1)
  last?: number;

  @Validate(CannotUseWithout, ["limit"])
  @Validate(CannotUseWith, ["after", "first", "before", "last"])
  @Field((_type) => Int, { nullable: true, description: "Paginate offset" })
  @Min(0)
  @ApiProperty({ description: "页码" })
  offset?: number;

  @Validate(CannotUseWithout, ["offset"])
  @Validate(CannotUseWith, ["after", "first", "before", "last"])
  @Field((_type) => Int, {
    nullable: true,
    defaultValue: 20,
    description: "Paginate limit",
  })
  @Min(0)
  @ApiProperty({ description: "一页几个" })
  limit?: number;
}

export function EdgeType<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class Edge implements Relay.Edge<T> {
    @Field(() => classRef)
    node: T;

    @Field((_type) => String, {
      description: "Used in `before` and `after` args",
    })
    cursor: string;
  }

  return Edge;
}

export function ConnectionType<T>(classRef: Type<T>, Edge: any): any {
  @ObjectType({ isAbstract: true })
  abstract class Connection {
    @Field(() => PageInfo)
    pageInfo: PageInfo;

    @Field(() => [Edge])
    edges: Array<T>;
  }

  return Connection;
}

type PagingMeta =
  | { pagingType: "forward"; after?: string; first: number }
  | { pagingType: "backward"; before?: string; last: number }
  | { pagingType: "pagination"; offset?: number; limit: number }
  | { pagingType: "none" };

export function getMeta(args: PaginationArgs): PagingMeta {
  const { first = 0, last = 0, after, before, limit = 0, offset } = args;
  const isForwardPaging = !!first || !!after;
  const isBackwardPaging = !!last || !!before;
  const isPagination = !!limit || !!offset;

  return isForwardPaging
    ? { pagingType: "forward", after, first }
    : isBackwardPaging
    ? { pagingType: "backward", before, last }
    : isPagination
    ? { pagingType: "pagination", offset, limit }
    : { pagingType: "none" };
}

export function connectionFromArraySlice(arraySlice: any, args: any, meta: any) {
  const after = args.after,
    before = args.before,
    first = args.first,
    last = args.last;
  const sliceStart = meta.sliceStart,
    arrayLength = meta.arrayLength;

  const sliceEnd = sliceStart + arraySlice.length;
  const beforeOffset = getOffsetWithDefault(before, arrayLength);
  const afterOffset = getOffsetWithDefault(after, -1);

  let startOffset = Math.max(sliceStart - 1, afterOffset, -1) + 1;
  let endOffset = Math.min(sliceEnd, beforeOffset, arrayLength);
  if (typeof first === "number") {
    if (first < 0) {
      throw new Error('Argument "first" must be a non-negative integer');
    }

    endOffset = Math.min(endOffset, startOffset + first);
  }
  if (typeof last === "number") {
    if (last < 0) {
      throw new Error('Argument "last" must be a non-negative integer');
    }

    startOffset = Math.max(startOffset, endOffset - last);
  }

  // If supplied slice is too large, trim it down before mapping over it.
  const slice = arraySlice.slice(
    Math.max(startOffset - sliceStart, 0),
    arraySlice.length - (sliceEnd - endOffset)
  );

  const edges = slice.map(function (value:any, index:any) {
    return {
      cursor: offsetToCursor(startOffset + index),
      node: value,
    };
  });

  const firstEdge = edges[0];
  const lastEdge = edges[edges.length - 1];
  const lowerBound = after ? afterOffset + 1 : 0;
  const upperBound = before ? beforeOffset : arrayLength;
  return {
    edges: edges,
    pageInfo: {
      startCursor: firstEdge ? firstEdge.cursor : null,
      endCursor: lastEdge ? lastEdge.cursor : null,
      hasPreviousPage:
        typeof last === "number" ? startOffset > lowerBound : false,
      hasNextPage: typeof first === "number" ? endOffset < upperBound : false,
    },
  };
}

/**
 * Create a 'paging parameters' object with 'limit' and 'offset' fields based on the incoming
 * cursor-paging arguments.
 */
export function getPagingParameters(args: PaginationArgs) {
  const meta = getMeta(args);

  switch (meta.pagingType) {
    case "pagination": {
      return {
        limit: meta.limit,
        offset: meta.offset || 0,
      };
    }
    case "forward": {
      return {
        limit: meta.first,
        offset: meta.after ? Relay.cursorToOffset(meta.after) + 1 : 0,
      };
    }
    case "backward": {
      const { last, before } = meta;
      let limit = last;
      // tslint:disable-next-line: no-non-null-assertion
      let offset = Relay.cursorToOffset(before!) - last;

      // Check to see if our before-page is underflowing past the 0th item
      if (offset < 0) {
        // Adjust the limit with the underflow value
        limit = Math.max(last + offset, 0);
        offset = 0;
      }

      return { offset, limit };
    }
    default:
      return {};
  }
}

export async function findAndPaginate<T extends ObjectLiteral>(
  condition: FindManyOptions<T>,
  connArgs: PaginationArgs,
  repository: Repository<T>
): Promise<Relay.Connection<T>> {
  if (!connArgs) {
    connArgs = {
      limit: 20,
      offset: 0,
    };
  }
  let { limit, offset } = getPagingParameters(connArgs);
  limit = Number(limit)
  offset = Number(offset)
  const [entities, count] = await repository.findAndCount({
    ...condition,
    skip: offset,
    take: limit,
  });

  const meta = getMeta(connArgs);
  if (meta.pagingType === "pagination") {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    connArgs.after = offset;
    connArgs.first = limit;
  }

  const res = connectionFromArraySlice(entities, connArgs, {
    arrayLength: count,
    sliceStart: offset || 0,
  });

  return res;
}

export async function getManyAndPaginate<T>(
  queryBuilder: SelectQueryBuilder<T>,
  connArgs: PaginationArgs
) {
  const { limit, offset } = getPagingParameters(connArgs);
  const [entities, count] = await queryBuilder
    .offset(offset)
    .limit(limit)
    .getManyAndCount();

  const res = Relay.connectionFromArraySlice(entities, connArgs, {
    arrayLength: count,
    sliceStart: offset || 0,
  });
  return res;
}

export {
  connectionFromArray,
  connectionFromPromisedArray,
  connectionFromPromisedArraySlice,
} from "graphql-relay";

export class ConnectionArgs {
  where?: WhereInput;
  orderBy?: any;
  pagination: PaginationArgs;
}
