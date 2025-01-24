import { CartService } from "./cart.service";
import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common";
import { AddToCartDTO } from "./dto/addToCart.dto";
import { UpdateQtyInCartDTO } from "./dto/updateQtyInCart.dto";

@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addToCart(@Body() body: AddToCartDTO) {
    return this.cartService.addToCart(body);
  }

  @Patch(":id")
  updateQtyInCart(
    @Param("id") cartId: number,
    @Body() body: UpdateQtyInCartDTO,
  ) {
    return this.cartService.updateQtyInCart(cartId, body);
  }

  @Delete(":id")
  deleteFromCart(@Param("id") cartId: number) {
    return this.cartService.removeBookInCart(cartId);
  }
}
