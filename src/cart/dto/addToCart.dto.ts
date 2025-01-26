import { IsNumber } from "class-validator";

export class AddToCartDTO {
  @IsNumber()
  bookId: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  qty: number;
}
