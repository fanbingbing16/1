import { OrderByDirection } from "src/common/paginate/order-by-direction";

export class OrderBySettingDto {
  id?: OrderByDirection;

  createdAt?: OrderByDirection;

  updatedAt?: OrderByDirection;
}
