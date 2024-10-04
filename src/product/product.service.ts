import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCreate } from './dto/product.create.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}
  async getAllProducts() {
    return await this.productRepo.find();
  }
  async getById(id: number) {
    return await this.productRepo.findOne({ where: { id } });
  }

  async createProduct(data: ProductCreate) {
    try {
      const newProduct = this.productRepo.create(data);
      await this.productRepo.save(newProduct);
      return newProduct;
    } catch (error) {
      throw new HttpException(
        'Error creating product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updateProduct(id: number, data: Partial<Product>) {
    try {
      const product = this.productRepo.findOne({ where: { id } });
      if (!product)
        return new HttpException('No Product Found', HttpStatus.NOT_FOUND);
      const updatedProduct = await this.productRepo.update(id, data);
      return updatedProduct;
    } catch (err) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteProduct(id: number) {
    try {
      const product = this.productRepo.findOne({ where: { id } });
      if (!product)
        return new HttpException('No Product Found', HttpStatus.NOT_FOUND);
      await this.productRepo.delete(id);
      return 'Deleted Successfully';
    } catch (err) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
