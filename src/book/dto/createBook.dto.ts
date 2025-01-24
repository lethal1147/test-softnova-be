import { IsDecimal, IsString } from "class-validator";

export class CreateBookDTO {
  @IsString()
  name: string;

  @IsString()
  author: string;

  @IsDecimal()
  price: number;
}
