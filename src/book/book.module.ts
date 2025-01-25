import { Module } from "@nestjs/common";
import { PrismaModule } from "src/common/prisma/prisma.module";
import { BookService } from "./book.service";
import { BookController } from "./book.controller";

@Module({
  controllers: [BookController],
  providers: [BookService],
  imports: [PrismaModule],
})
export class BookModule {}
