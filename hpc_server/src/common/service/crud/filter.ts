import {
  FindConditions,
  Not,
  Equal,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  In,
  Like,
  IsNull,
  ObjectLiteral,
  Raw,
  Between,
  FindManyOptions,
} from "typeorm";

export interface StringMap {
  [key: string]: string;
}

export async function transformFindOptions<T>(
  where: // FindManyOptions<T>["where"],
  ObjectLiteral,
  columnMap: StringMap
): Promise<FindManyOptions<T>> {
  // Promise<string | FindConditions<T> | ObjectLiteral | FindConditions<T>[]>
  Object.keys(where).forEach((key) => {
    const parts = key.toString().split("_"); // ['itemName', 'contains']
    const attr = parts[0]; // itemName
    const operator = parts.length > 1 ? parts[1] : "eq"; // contains
    if (columnMap[attr]) {
      switch (operator) {
        case "eq":
          if (where[key] === null) {
            where[attr] = IsNull();
          } else {
            where[attr] = Equal(where[key]);
          }
          break;
        case "not":
          where[attr] = Not(where[key]);
          break;
        case "lt":
          where[attr] = LessThan(where[key]);
          break;
        case "lte":
          where[attr] = LessThanOrEqual(where[key]);
          break;
        case "gt":
          where[attr] = MoreThan(where[key]);
          break;
        case "gte":
          where[attr] = MoreThanOrEqual(where[key]);
          break;
        case "in":
          where[attr] = In(where[key]);
          break;
        case "contains":
          where[attr] = Like(`%${where[key]}%`);
          break;
        case "startsWith":
          where[attr] = Like(`${where[key]}%`);
          break;
        case "endsWith":
          where[attr] = Like(`%${where[key]}`);
          break;
        case "raw":
          where[attr] = Raw(where[key]);
          break;
        case "between":
          where[attr] = Between(where[key][0], where[key][1]);
          break;
        default:
          break;
      }
      delete where[key];
    }
  });
  return where;
}
