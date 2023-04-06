import { OrderByDirection } from "src/common/paginate/order-by-direction";

export class OrderByUserDto {
  id?: OrderByDirection;

  createdAt?: OrderByDirection;

  updatedAt?: OrderByDirection;
}
