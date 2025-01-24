import { IsString } from "class-validator";

export class LoginBodyDTO {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
