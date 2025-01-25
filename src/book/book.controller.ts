import { Controller, Get, UseGuards } from "@nestjs/common";
import { BookService } from "./book.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("api/book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getBooksHomepage() {
    return this.bookService.getBooksHomepage();
  }
}
