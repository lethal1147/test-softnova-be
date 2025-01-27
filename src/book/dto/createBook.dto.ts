import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsString } from "class-validator";

export class CreateBookDTO {
  @ApiProperty({
    example: "Harry Potter and the Philosopher's Stone",
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: "J. K. Rowling",
    required: true,
  })
  @IsString()
  author: string;

  @ApiProperty({
    example: 100,
    required: true,
  })
  @IsDecimal()
  price: number;
}
