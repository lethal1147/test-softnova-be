import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { BookService } from "./book.service";
import { plainToInstance } from "class-transformer";
import { CreateBookDTO } from "./dto/createBook.dto";
import { AnyFilesInterceptor } from "@nestjs/platform-express";

@Controller("api/book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get("home")
  getBooksHomepage() {
    return this.bookService.getBooksHomepage();
  }

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
}
