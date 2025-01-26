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

@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
