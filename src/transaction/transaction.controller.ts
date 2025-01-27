import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { CreateTransactionDTO } from "./dto/createTransaction.dto";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("Transaction")
@Controller("api/transaction")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOperation({
    summary: "Create a transaction",
    description:
      "Create a new transaction and remove the purchased items from the cart.",
  })
  @ApiBody({
    description: "Transaction creation payload",
    required: true,
    schema: {
      type: "object",
      properties: {
        userId: { type: "number", example: 1 },
        total: { type: "number", example: 100.5 },
        discount: { type: "number", example: 10 },
        bookTransactionItem: {
          type: "array",
          items: {
            type: "object",
            properties: {
              bookId: { type: "number", example: 10 },
              qty: { type: "number", example: 2 },
              price: { type: "number", example: 50 },
            },
          },
        },
      },
      required: ["userId", "total", "bookTransactionItem"],
    },
  })
  @ApiResponse({
    status: 200,
    description: "Transaction created successfully.",
    schema: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            id: { type: "number", example: 1 },
            userId: { type: "number", example: 1 },
            total: { type: "number", example: 100.5 },
            discount: { type: "number", example: 10 },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-01T12:00:00Z",
            },
            bookTransactionItem: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  bookId: { type: "number", example: 10 },
                  qty: { type: "number", example: 2 },
                  price: { type: "number", example: 50 },
                },
              },
            },
          },
        },
        message: {
          type: "string",
          example: "Create transaction successfully.",
        },
      },
    },
  })
  @Post("")
  createTransaction(@Body() body: CreateTransactionDTO) {
    return this.transactionService.createTransaction(body);
  }

  @ApiOperation({
    summary: "Get all transactions for a user",
    description:
      "Retrieve all transactions for a specific user, paginated and with book details.",
  })
  @ApiParam({
    name: "id",
    description: "ID of the user to fetch transactions for",
    required: true,
    type: Number,
  })
  @ApiQuery({
    name: "page",
    description: "Page number for pagination (default is 1)",
    required: false,
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: "limit",
    description: "Number of transactions per page (default is 10)",
    required: false,
    type: Number,
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved transactions for the user.",
    schema: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            transactions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number", example: 1 },
                  userId: { type: "number", example: 1 },
                  total: { type: "number", example: 100 },
                  discount: { type: "number", example: 10 },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                    example: "2024-01-01T12:00:00Z",
                  },
                  bookTransactionItem: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        bookId: { type: "number", example: 10 },
                        qty: { type: "number", example: 2 },
                        price: { type: "number", example: 50 },
                        book: {
                          type: "object",
                          properties: {
                            id: { type: "number", example: 10 },
                            name: { type: "string", example: "The Great Book" },
                            author: { type: "string", example: "John Doe" },
                            price: { type: "number", example: 50 },
                            bookImage: {
                              type: "string",
                              example: "base64encodedimage",
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            total: { type: "number", example: 5 },
          },
        },
        message: {
          type: "string",
          example: "Get all transaction successfully.",
        },
      },
    },
  })
  @Get(":id")
  getAllTransaction(
    @Param("id", ParseIntPipe) userId: number,
    @Query()
    query: {
      page?: number;
      limit?: number;
    },
  ) {
    return this.transactionService.getAllTransaction({ userId, ...query });
  }
}
