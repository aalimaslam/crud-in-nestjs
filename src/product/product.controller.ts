import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreate } from './dto/product.create.dto';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { AdminRoleGuard } from 'src/core/guards/role.guard';
@UseGuards(AuthGuard)
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
  @UseGuards(AdminRoleGuard)
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
