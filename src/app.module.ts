import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './core/database/database.module';
import { OrdersModule } from './orders/orders.module';
@Module({
  imports: [ProductModule, DatabaseModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
