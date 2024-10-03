import { IsNotEmpty, Max, Min } from 'class-validator';

export class ProductCreate {
  @IsNotEmpty()
  @Max(50)
  @Min(5)
  title: string;

  @IsNotEmpty()
  @Min(50)
  description: string;

  @IsNotEmpty()
  price: number;
}
