import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class UpdateQtyInCartDTO {
  @ApiProperty({
    example: 2,
    required: true,
  })
  @IsInt()
  qty: number;
}
