import { IsArray, IsDecimal, IsInt, ValidateNested } from "class-validator";

export class TransactionItemDTO {
  @IsInt()
  bookId: number;

  @IsDecimal()
  price: number;

  @IsInt()
  qty: number;
}

export class CreateTransactionDTO {
  @IsInt()
  userId: number;

  @IsInt()
  total: number;

  @IsInt()
  discount: number;

  @IsArray()
  @ValidateNested({ each: true })
  bookTransactionItem: TransactionItemDTO[];
}
