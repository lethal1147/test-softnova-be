import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BookController } from "./book/book.controller";
import { BookService } from "./book/book.service";
import { BookModule } from "./book/book.module";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { UserModule } from "./user/user.module";
import { CartController } from "./cart/cart.controller";
import { CartModule } from "./cart/cart.module";
import { TransactionController } from "./transaction/transaction.controller";
import { TransactionService } from "./transaction/transaction.service";
import { TransactionModule } from "./transaction/transaction.module";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { AuthModule } from "./auth/auth.module";
import { CartService } from "./cart/cart.service";
import { PrismaModule } from "./common/prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    PrismaModule,
    BookModule,
    UserModule,
    CartModule,
    TransactionModule,
    AuthModule,
  ],
  controllers: [
    AppController,
    BookController,
    UserController,
    CartController,
    TransactionController,
    AuthController,
  ],
  providers: [
    AppService,
    BookService,
    UserService,
    CartService,
    TransactionService,
    AuthService,
    JwtService,
  ],
})
export class AppModule {}
