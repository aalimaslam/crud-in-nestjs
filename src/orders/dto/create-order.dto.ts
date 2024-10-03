import { Product } from 'src/product/entity/product.entity';

export class CreateOrderDto {
  amount: number;
  quantity: number;
  product: Product;
}
