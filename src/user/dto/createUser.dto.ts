import { UserRole } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";

export class CreateUserDTO {
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsEnum(UserRole)
  readonly role: UserRole;
}
