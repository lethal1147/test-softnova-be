import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import { CreateTransactionDTO } from "./dto/createTransaction.dto";
import { handleSuccessResponse } from "utils/utils";

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async createTransaction(body: CreateTransactionDTO) {
    try {
      const transaction = await this.prisma.bookTransaction.create({
        data: {
          userId: body.userId,
          total: body.total,
          discount: body.discount,
          bookTransactionItem: {
            createMany: { data: body.bookTransactionItem },
          },
        },
      });

      return handleSuccessResponse({
        data: transaction,
        message: "Create transaction successfully.",
      });
    } catch (err) {
      throw err;
    }
  }
}
