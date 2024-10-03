import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './entity/orders.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    private productService: ProductService,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepo.find();
  }

  async getOrderById(id: number): Promise<Order> {
    return await this.orderRepo.findOne({ where: { id } });
  }

  async createOrder(data): Promise<Order | NotFoundException> {
    const { amount, quantity, product_id } = data;

    const product = await this.productService.getById(product_id);

    // Check if product exists
    if (!product) return new NotFoundException('Product not Found');

    // Now, you can proceed with creating the order and associating the product with it
    const newOrder = this.orderRepo.create({
      amount,
      product,
      quantity,
    });

    await this.orderRepo.save(newOrder);

    return newOrder;
  }
}
