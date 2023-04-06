import { OrderByDirection } from "src/common/paginate/order-by-direction";

export class OrderByUserRecordDto {
  id?: OrderByDirection;

  createdAt?: OrderByDirection;

  updatedAt?: OrderByDirection;
}
