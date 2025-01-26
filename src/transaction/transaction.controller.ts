import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { CreateTransactionDTO } from "./dto/createTransaction.dto";

@Controller("api/transaction")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post("")
  createTransaction(@Body() body: CreateTransactionDTO) {
    return this.transactionService.createTransaction(body);
  }

  @Get(":id")
  getAllTransaction(@Param("id", ParseIntPipe) userId: number) {
    return this.transactionService.getAllTransaction({ userId });
  }
}
