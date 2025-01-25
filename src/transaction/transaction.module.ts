import { Module } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { TransactionController } from "./transaction.controller";
import { PrismaModule } from "src/common/prisma/prisma.module";

@Module({
  controllers: [TransactionController],
  imports: [PrismaModule],
  providers: [TransactionService],
})
export class TransactionModule {}
