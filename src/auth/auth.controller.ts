import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./dto/login.dto";
import { Response } from "express";
import { handleSuccessResponse } from "utils/utils";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags("Auth")
  @ApiOperation({
    summary: "User login",
    description:
      "Authenticate a user with email and password and return an access token in a cookie.",
  })
  @ApiBody({
    description: "User login credentials",
    required: true,
    schema: {
      type: "object",
      properties: {
        email: { type: "string", format: "email", example: "test@gmail.com" },
        password: { type: "string", example: "123123" },
      },
      required: ["email", "password"],
    },
  })
  @ApiResponse({
    status: 200,
    description: "Successfully authenticated user.",
    schema: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            id: { type: "number", example: 1 },
            email: {
              type: "string",
              format: "email",
              example: "test@gmail.com",
            },
          },
        },
        message: { type: "string", example: "Login successfully." },
      },
    },
  })
  @Post("login")
  async login(
    @Body() body: LoginDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(body);
    if (!user) {
      throw new UnauthorizedException("Wrong email or password.");
    }
    const result = await this.authService.login(user);

    res.cookie("access-token", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    return handleSuccessResponse({
      data: user,
      message: "Login successfully.",
    });
  }
}
