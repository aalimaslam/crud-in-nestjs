import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreate } from './dto/product.create.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.getById(id);
  }

  @Post()
  async create(@Body() product: ProductCreate) {
    return await this.productService.createProduct(product);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() product: Partial<ProductCreate>,
  ) {
    return await this.productService.updateProduct(id, product);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.productService.deleteProduct(id);
  }
}
