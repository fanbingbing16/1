import { Edge } from "graphql-relay";
import { PageInfo } from "./connection-paging";

export class ConnectionBase<T> {
  edges: Array<Edge<T>>;
  pageInfo: PageInfo;
  aggregate: {
    count: number;
  };
}
