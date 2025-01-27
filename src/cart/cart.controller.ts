import { CartService } from "./cart.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AddToCartDTO } from "./dto/addToCart.dto";
import { UpdateQtyInCartDTO } from "./dto/updateQtyInCart.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("api/cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiTags("Cart")
  @ApiOperation({
    summary: "Add to cart",
    description: "Add a book to the user’s cart.",
  })
  @ApiBody({
    description: "Add to cart payload",
    required: true,
    schema: {
      type: "object",
      properties: {
        userId: { type: "number", example: 1 },
        bookId: { type: "number", example: 10 },
        qty: { type: "number", example: 2 },
      },
      required: ["userId", "bookId", "qty"],
    },
  })
  @ApiResponse({
    status: 200,
    description: "Book added to cart successfully.",
    schema: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            id: { type: "number", example: 1 },
            userId: { type: "number", example: 1 },
            bookId: { type: "number", example: 10 },
            qty: { type: "number", example: 2 },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-01-01T12:00:00Z",
            },
          },
        },
        message: { type: "string", example: "Add to cart successfully." },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  addToCart(@Body() body: AddToCartDTO) {
    return this.cartService.addToCart(body);
  }

  @ApiTags("Cart")
  @ApiOperation({
    summary: "Update quantity in cart",
    description:
      "Update the quantity of a book in the cart. If quantity is less than or equal to 0, the item is removed from the cart.",
  })
  @ApiBody({
    description: "Update quantity payload",
    required: true,
    schema: {
      type: "object",
      properties: {
        qty: { type: "number", example: 3 },
      },
      required: ["qty"],
    },
  })
  @ApiResponse({
    status: 200,
    description: "Quantity updated successfully or item removed from cart.",
    schema: {
      type: "object",
      properties: {
        data: { type: "null", example: null },
        message: { type: "string", example: "Update quantity successfully." },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  updateQtyInCart(
    @Param("id") cartId: number,
    @Body() body: UpdateQtyInCartDTO,
  ) {
    return this.cartService.updateQtyInCart(cartId, body);
  }

  @ApiTags("Cart")
  @ApiOperation({
    summary: "Remove book from cart",
    description: "Remove a specific book from the user’s cart.",
  })
  @ApiResponse({
    status: 200,
    description: "Book removed from cart successfully.",
    schema: {
      type: "object",
      properties: {
        data: { type: "null", example: null },
        message: {
          type: "string",
          example: "Book removed from cart successfully.",
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  deleteFromCart(@Param("id") cartId: number) {
    return this.cartService.removeBookInCart(cartId);
  }

  @ApiTags("Cart")
  @ApiOperation({
    summary: "Get all cart items by user",
    description:
      "Retrieve all cart items for a specific user, including book details.",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved cart items for the user.",
    schema: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number", example: 1 },
              userId: { type: "number", example: 1 },
              bookId: { type: "number", example: 10 },
              qty: { type: "number", example: 2 },
              createdAt: {
                type: "string",
                format: "date-time",
                example: "2024-01-01T12:00:00Z",
              },
              book: {
                type: "object",
                properties: {
                  id: { type: "number", example: 10 },
                  name: { type: "string", example: "The Great Book" },
                  author: { type: "string", example: "John Doe" },
                  price: { type: "number", example: 19.99 },
                  bookImage: { type: "string", example: "base64encodedimage" },
                },
              },
            },
          },
        },
        message: { type: "string", example: "Get all cart item successfully." },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getAllCartByUserId(@Param("id") userId: number) {
    return this.cartService.getAllCartByUserId(userId);
  }
}
