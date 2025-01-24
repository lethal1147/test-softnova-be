import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { BookModule } from './book/book.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { CartController } from './cart/cart.controller';
import { CartModule } from './cart/cart.module';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionService } from './transaction/transaction.service';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [BookModule, UserModule, CartModule, TransactionModule],
  controllers: [AppController, BookController, UserController, CartController, TransactionController],
  providers: [AppService, BookService, UserService, TransactionService],
})
export class AppModule {}
