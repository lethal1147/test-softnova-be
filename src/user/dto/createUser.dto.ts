import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class CreateUserDTO {
  @ApiProperty({
    example: "test@gmail.com",
    required: true,
  })
  @IsString()
  readonly email: string;

  @ApiProperty({
    example: "123123",
    required: true,
  })
  @IsString()
  readonly password: string;

  @ApiProperty({
    enum: ["admin", "user"],
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole)
  readonly role: UserRole;
}
