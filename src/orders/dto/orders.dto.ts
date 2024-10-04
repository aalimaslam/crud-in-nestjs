import { ProductDto } from 'src/product/dto/product.dto';

export class OrderDto {
  id: number;
  amount: number;
  quantity: number;
  product: ProductDto;
  createdAt: Date;
  updatedAt: Date;
}
