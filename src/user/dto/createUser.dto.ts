import { UserRole } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class CreateUserDTO {
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsOptional()
  @IsEnum(UserRole)
  readonly role: UserRole;
}
