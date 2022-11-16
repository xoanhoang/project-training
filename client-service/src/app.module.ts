import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/databaseConfig';
import { User } from './models/users.entity';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { FilesModule } from './files/files.module';


@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig),TypeOrmModule.forFeature([User]), AuthModule, MailModule,
  ConfigModule.forRoot({
    isGlobal: true, 
  }),
  ProductModule,
  OrderModule,
  CartModule,
  FilesModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
