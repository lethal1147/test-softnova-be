import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class AddToCartDTO {
  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNumber()
  bookId: number;

  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNumber()
  qty: number;
}
