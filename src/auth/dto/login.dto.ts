import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {
  @ApiProperty({
    example: "test@gmail.com",
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: "123123",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
