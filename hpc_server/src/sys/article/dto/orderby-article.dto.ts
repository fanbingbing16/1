import { OrderByDirection } from "src/common/paginate/order-by-direction";

export class OrderByArticleDto {
  id?: OrderByDirection;

  createdAt?: OrderByDirection;

  updatedAt?: OrderByDirection;
}
