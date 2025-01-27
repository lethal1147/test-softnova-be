import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import { CreateBookDTO } from "./dto/createBook.dto";
import { handleSuccessResponse } from "utils/utils";
import { Prisma } from "@prisma/client";

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async createBook(body: CreateBookDTO, file: Express.Multer.File) {
    try {
      const fileBase64 = file.buffer?.toString("base64") || null;
      const book = await this.prisma.book.create({
        data: {
          name: body.name,
          author: body.author,
          price: body.price,
          bookImage: fileBase64,
        },
      });

      return handleSuccessResponse({
        data: book,
        message: "Create book successfully.",
      });
    } catch (err) {
      throw err;
    }
  }

  async updateBook(id: number, body: CreateBookDTO, file: Express.Multer.File) {
    try {
      const fileBase64 = file.buffer?.toString("base64");
      const book = await this.prisma.book.update({
        where: {
          id,
        },
        data: {
          name: body.name,
          author: body.author,
          price: body.price,
          ...(fileBase64 && { bookImage: fileBase64 }),
        },
      });

      return handleSuccessResponse({
        data: book,
        message: "Update book successfully.",
      });
    } catch (err) {
      throw err;
    }
  }

  async getBooksHomepage() {
    try {
      const [bestSellerData, newRelease] = await Promise.all([
        this.prisma.bookTransactionItem.groupBy({
          by: ["bookId"],
          _sum: {
            qty: true,
          },
          orderBy: {
            _sum: {
              qty: "desc",
            },
          },
          take: 5,
        }),
        this.prisma.book.findMany({
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
        }),
      ]);

      const bestSeller = await Promise.all(
        bestSellerData.map(async (item) => {
          const book = await this.prisma.book.findUnique({
            where: { id: item.bookId },
          });
          return {
            book,
            totalQty: item._sum.qty,
          };
        }),
      );

      const formatted = bestSeller.map((book) => ({ ...book.book }));

      return handleSuccessResponse({
        data: {
          bestSeller: formatted,
          newRelease,
        },
        message: "Get books successfully.",
      });
    } catch (err) {
      throw err;
    }
  }

  async getSearchBook(filter: {
    textSearch?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
  }) {
    try {
      const { textSearch, maxPrice, minPrice, page = 1, limit = 10 } = filter;

      const filters: Prisma.BookWhereInput = {
        ...(textSearch && {
          OR: [
            { name: { contains: textSearch, mode: "insensitive" } },
            { author: { contains: textSearch, mode: "insensitive" } },
          ],
        }),
        ...(minPrice && { price: { gte: +minPrice } }),
        ...(maxPrice && { price: { lte: +maxPrice } }),
      };
      const [books, total] = await this.prisma.$transaction(async (prisma) => [
        await prisma.book.findMany({
          where: filters,
          skip: +limit * (page - 1),
          take: +limit,
        }),
        await prisma.book.count({
          where: filters,
        }),
      ]);

      return handleSuccessResponse({
        data: { books, total },
        message: "Get filtered book successfully.",
      });
    } catch (err) {
      throw err;
    }
  }
}
