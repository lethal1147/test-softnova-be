import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDecimal, IsInt, ValidateNested } from "class-validator";

export class TransactionItemDTO {
  @ApiProperty({
    example: 1,
  })
  @IsInt()
  bookId: number;

  @ApiProperty({
    example: 100,
  })
  @IsDecimal()
  price: number;

  @ApiProperty({
    example: 1,
  })
  @IsInt()
  qty: number;
}

export class CreateTransactionDTO {
  @ApiProperty({
    example: 1,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    example: 100,
  })
  @IsInt()
  total: number;

  @ApiProperty({
    example: 0,
  })
  @IsInt()
  discount: number;

  @ApiProperty({
    example: [{ bookId: 1, price: 100, qty: 1 }],
  })
  @IsArray()
  @ValidateNested({ each: true })
  bookTransactionItem: TransactionItemDTO[];
}
