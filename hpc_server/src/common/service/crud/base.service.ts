/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { ConnectionBase } from "src/common/paginate/connection";
import {
  findAndPaginate,
  PaginationArgs,
} from "src/common/paginate/connection-paging";

import {
  Repository,
  // FindManyOptions,
  DeepPartial,
  UpdateResult,
  ObjectID,
  ObjectLiteral,
  FindManyOptions,
} from "typeorm";

import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { StringMap, transformFindOptions } from "./filter";

export class BaseCRUDService<
  T extends ObjectLiteral
> extends TypeOrmCrudService<T> {
  public columnMap: StringMap;

  constructor(protected repository: Repository<T>) {
    super(repository);
    this.columnMap = this.repository.metadata.columns.reduce(
      (prev: StringMap, column: ColumnMetadata) => {
        prev[column.propertyPath] = column.databasePath;
        return prev;
      },
      {}
    );
  }

  async findById(id: string): Promise<T | undefined> {
    return await this.repository.findOne({ where: { id } });
  }

  async findByIds(ids: string[]): Promise<T[]> {
    return await this.repository.findByIds(ids);
  }

  async insert(entities: DeepPartial<T>[]): Promise<T[]> {
    const result = await this.repository.insert(entities as any);
    return result.generatedMaps as T[];
  }

  // @ts-ignore
  async createEntity(data: DeepPartial<T>): Promise<T> {
    const result = this.repository.create(data);
    return await this.repository.save(result as any);
  }

  // @ts-ignore
  async createEntities(data: DeepPartial<T>[]): Promise<T[]> {
    const result = this.repository.create(data);
    return await this.repository.save(result as any);
  }

  // @ts-ignore
  async updateEntity(
    where: string | number | Date | ObjectID,
    data: QueryDeepPartialEntity<T>
    // data: Partial<T> | QueryDeepPartialEntity<T>
  ): Promise<UpdateResult> {
    const entity = await this.repository.findOne(where);
    let result: UpdateResult = new UpdateResult();
    if (entity) {
      result = await this.repository.update(where, Object.assign(entity, data));
    }
    return result;
  }

  async updateEntities(
    where: ObjectLiteral,
    data: QueryDeepPartialEntity<T>
  ): Promise<UpdateResult> {
    where = await transformFindOptions(where, this.columnMap);
    // @ts-ignore
    return await this.repository.update(where, data);
  }

  async destroyOne(id: string): Promise<boolean> {
    await this.repository.softDelete(id);
    return true;
  }

  async destroyMany(where: ObjectLiteral): Promise<UpdateResult> {
    where = await transformFindOptions(where, this.columnMap);
    // @ts-ignore
    return await this.repository.softDelete(where);
  }

  async findAndPaginate<C extends ConnectionBase<T>>(
    where: ObjectLiteral,
    paginationArgs: PaginationArgs,
    order?: FindManyOptions<T>["order"]
  ): Promise<C> {
    // console.log("where", where);
    where = await transformFindOptions(where, this.columnMap);
    // console.log("where", where);
    if (!order) order = {};
    const connection = await findAndPaginate(
      { where, order },
      paginationArgs,
      this.repository
    );
    const count = await this.repository.count({ where });
    const c = <C>{};
    c.aggregate = { count };
    c.edges = connection.edges;
    c.pageInfo = connection.pageInfo;
    c.pageInfo.totalCount = count;
    return c;
  }
}
