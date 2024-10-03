import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('product')
export class ProductController {
  @Get()
  getAllProducts() {}
  
  @Get(':id')
  getProductById() {}

  @Post()
  create() {}

  @Patch()
  update() {}

  @Delete()
  delete() {}
}
