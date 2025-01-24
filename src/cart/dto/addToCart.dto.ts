import { IsInt } from "class-validator";

export class AddToCartDTO {
  @IsInt()
  bookId: number;

  @IsInt()
  userId: number;

  @IsInt()
  qty: number;
}
