import { IsInt } from "class-validator";

export class UpdateQtyInCartDTO {
  @IsInt()
  qty: number;
}
