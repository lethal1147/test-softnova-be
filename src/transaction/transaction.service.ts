import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import { CreateTransactionDTO } from "./dto/createTransaction.dto";
import { handleSuccessResponse } from "utils/utils";

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async createTransaction(body: CreateTransactionDTO) {
    try {
      const transaction = await this.prisma.$transaction(async (prisma) => {
        const t = await prisma.bookTransaction.create({
          data: {
            userId: body.userId,
            total: body.total,
            discount: body.discount,
            bookTransactionItem: {
              createMany: { data: body.bookTransactionItem },
            },
          },
        });
        await prisma.cart.deleteMany({
          where: {
            userId: body.userId,
            bookId: { in: body.bookTransactionItem.map((item) => item.bookId) },
          },
        });

        return t;
      });

      return handleSuccessResponse({
        data: transaction,
        message: "Create transaction successfully.",
      });
    } catch (err) {
      throw err;
    }
  }

  async getAllTransaction({ userId }: { userId: number }) {
    try {
      const [transactions, total] = await this.prisma.$transaction(
        async (prisma) => [
          await prisma.bookTransaction.findMany({
            where: {
              userId: userId,
            },
            include: {
              bookTransactionItem: {
                include: { book: true },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          }),
          await prisma.bookTransaction.count({
            where: { userId: userId },
          }),
        ],
      );

      return handleSuccessResponse({
        data: { transactions, total },
        message: "Get all transaction successfully.",
      });
    } catch (err) {
      throw err;
    }
  }
}
