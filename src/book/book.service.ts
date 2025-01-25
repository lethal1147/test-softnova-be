import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import { CreateBookDTO } from "./dto/createBook.dto";
import { handleSuccessResponse } from "utils/utils";

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async createBook(body: CreateBookDTO, file: Express.Multer.File[]) {
    try {
      const fileBase64 = file[0]?.buffer?.toString("base64") || null;
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

  async updateBook(
    id: number,
    body: CreateBookDTO,
    file: Express.Multer.File[],
  ) {
    try {
      const fileBase64 = file[0]?.buffer?.toString("base64") || null;
      const book = await this.prisma.book.update({
        where: {
          id,
        },
        data: {
          name: body.name,
          author: body.author,
          price: body.price,
          bookImage: fileBase64,
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
          take: 10,
        }),
        this.prisma.book.findMany({
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
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

      return handleSuccessResponse({
        data: {
          bestSeller,
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
  }) {
    try {
      const { textSearch, maxPrice, minPrice } = filter;

      const filters = {
        ...(textSearch && {
          OR: [
            { name: { contains: textSearch, mode: "insensitive" } },
            { author: { contains: textSearch, mode: "insensitive" } },
          ],
        }),
        ...(minPrice && { price: { gte: minPrice } }),
        ...(maxPrice && { price: { lte: maxPrice } }),
      };
      console.log(filters);

      const books = await this.prisma.book.findMany({
        where: {},
      });

      return handleSuccessResponse({
        data: books,
        message: "Get filtered book successfully.",
      });
    } catch (err) {
      throw err;
    }
  }
}
