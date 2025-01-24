import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import { AddToCartDTO } from "./dto/addToCart.dto";
import { handleSuccessResponse } from "utils/utils";
import { UpdateQtyInCartDTO } from "./dto/updateQtyInCart.dto";

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async addToCart(body: AddToCartDTO) {
    try {
      const cart = await this.prisma.cart.create({
        data: {
          userId: body.userId,
          bookId: body.bookId,
          qty: body.qty,
        },
      });

      return handleSuccessResponse({
        data: cart,
        message: "Add to cart successfully.",
      });
    } catch (err) {
      throw err;
    }
  }

  async updateQtyInCart(cartId: number, body: UpdateQtyInCartDTO) {
    try {
      const cart = await this.prisma.cart.update({
        where: {
          id: cartId,
        },
        data: {
          qty: body.qty,
        },
      });

      return handleSuccessResponse({
        data: cart,
        message: "Update quantity successfully.",
      });
    } catch (err) {
      throw err;
    }
  }

  async removeBookInCart(cardId: number) {
    try {
      await this.prisma.cart.delete({
        where: {
          id: cardId,
        },
      });

      return handleSuccessResponse({
        data: null,
        message: "Update quantity successfully.",
      });
    } catch (err) {
      throw err;
    }
  }
}
