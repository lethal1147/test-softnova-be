import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { BookService } from "./book.service";
import { plainToInstance } from "class-transformer";
import { CreateBookDTO } from "./dto/createBook.dto";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("api/book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({
    summary: "Get best seller book and new release book.",
    description: "Get top 5 best seller book and new release book",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved books for the homepage.",
    schema: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            bestSeller: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number", example: 1 },
                  name: { type: "string", example: "Best Seller Book" },
                  author: { type: "string", example: "Author Name" },
                  price: { type: "number", example: 100 },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                    example: "2025-01-01T12:00:00Z",
                  },
                },
              },
            },
            newRelease: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number", example: 2 },
                  name: { type: "string", example: "New Release Book" },
                  author: { type: "string", example: "New Author" },
                  price: { type: "number", example: 100 },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                    example: "2025-01-15T12:00:00Z",
                  },
                },
              },
            },
          },
        },
        message: { type: "string", example: "Get books successfully." },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Get("home")
  getBooksHomepage() {
    return this.bookService.getBooksHomepage();
  }

  @ApiOperation({
    summary: "Get all book that match query.",
    description: "Get all book that match search query.",
  })
  @ApiQuery({
    name: "textSearch",
    type: "string",
    required: false,
    description: "Search for books by name or author (case insensitive).",
  })
  @ApiQuery({
    name: "minPrice",
    type: "number",
    required: false,
    description: "Filter books with a minimum price.",
  })
  @ApiQuery({
    name: "maxPrice",
    type: "number",
    required: false,
    description: "Filter books with a maximum price.",
  })
  @ApiQuery({
    name: "page",
    type: "number",
    required: false,
    example: 1,
    description: "Page number for pagination (default is 1).",
  })
  @ApiQuery({
    name: "limit",
    type: "number",
    required: false,
    example: 10,
    description: "Number of books per page (default is 10).",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved filtered books.",
    schema: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            books: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number", example: 1 },
                  name: { type: "string", example: "Sample Book Name" },
                  author: { type: "string", example: "Author Name" },
                  price: { type: "number", example: 19.99 },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                    example: "2025-01-01T12:00:00Z",
                  },
                },
              },
            },
            total: { type: "number", example: 100 },
          },
        },
        message: { type: "string", example: "Get filtered book successfully." },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Get("search")
  getSearchBook(
    @Query()
    query: {
      textSearch?: string;
      minPrice?: number;
      maxPrice?: number;
      page?: number;
      limit?: number;
    },
  ) {
    return this.bookService.getSearchBook(query);
  }

  @ApiOperation({
    summary: "Create new book.",
    description: "Create new book.",
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "Create a new book",
    schema: {
      type: "object",
      properties: {
        name: { type: "string", example: "Book name" },
        author: { type: "string", example: "Author name" },
        price: { type: "number", example: 100 },
        file: {
          type: "string",
          format: "binary",
          description: "Book cover image file",
        },
      },
      required: ["name", "author", "price", "file"],
    },
  })
  @ApiResponse({
    status: 201,
    description: "The book has been successfully created.",
    schema: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            id: {
              type: "number",
              example: 1,
            },
            name: { type: "string", example: "Book name" },
            author: { type: "string", example: "Author name" },
            price: { type: "number", example: 100 },
            bookImage: { type: "string", example: "<base64-string>" },
          },
        },
        message: { type: "string", example: "Create book successfully." },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post("")
  @UseInterceptors(AnyFilesInterceptor())
  createBook(
    @Body() body: Record<string, string>,
    @UploadedFiles() file: Express.Multer.File,
  ) {
    const parsedBody = JSON.parse(body.body);
    const formattedBody = plainToInstance(CreateBookDTO, parsedBody);
    return this.bookService.createBook(formattedBody, file[0]);
  }

  @ApiOperation({
    summary: "Update book by book id.",
    description: "Update book by book id.",
  })
  @ApiParam({
    name: "id",
    required: true,
    description: "The ID of the book to update",
    type: "number",
    example: 1,
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "Update book details",
    schema: {
      type: "object",
      properties: {
        name: { type: "string", example: "Updated Book Title" },
        author: { type: "string", example: "Updated Author Name" },
        price: { type: "number", example: 200 },
        file: {
          type: "string",
          format: "binary",
          description: "Updated book cover image file",
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "The book has been successfully updated.",
    schema: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            id: { type: "number", example: 1 },
            name: { type: "string", example: "Updated Book Title" },
            author: { type: "string", example: "Updated Author Name" },
            price: { type: "number", example: 500 },
            bookImage: { type: "string", example: "<base64-string>" },
          },
        },
        message: { type: "string", example: "Update book successfully." },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Patch("/:id")
  @UseInterceptors(AnyFilesInterceptor())
  updateBook(
    @Param("id") id: number,
    @Body() body: Record<string, string>,
    @UploadedFiles() file: Express.Multer.File,
  ) {
    const parsedBody = JSON.parse(body.body);
    const formattedBody = plainToInstance(CreateBookDTO, parsedBody);
    return this.bookService.updateBook(+id, formattedBody, file[0]);
  }
}
