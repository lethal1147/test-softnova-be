import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import { CreateUserDTO } from "./dto/createUser.dto";
import { comparePassword, hashPassword } from "utils/authen";
import { handleSuccessResponse } from "utils/utils";
import createError from "utils/createError";
import { LoginBodyDTO } from "./dto/loginBody.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async login(body: LoginBodyDTO) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: body.email,
          deletedAt: null,
        },
      });

      if (!user) createError("Incorrect email or password", 401);

      const isCorrectPassword = await comparePassword(
        body.password,
        user.password,
      );
      if (!isCorrectPassword) createError("Incorrect email or password", 401);

      return handleSuccessResponse({
        data: user,
        message: "Login successfully.",
      });
    } catch (err) {
      throw err;
    }
  }

  async createUser(body: CreateUserDTO) {
    try {
      const hashedPassword = await hashPassword(body.password);
      const user = await this.prisma.user.create({
        data: {
          email: body.email,
          password: hashedPassword,
          role: body.role || "user",
        },
      });

      return handleSuccessResponse({
        data: user,
        message: "Create user successfully.",
      });
    } catch (err) {
      throw err;
    }
  }

  async getOneUser(id: number) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id,
        },
      });

      return handleSuccessResponse({
        data: user,
        message: "Get one user successfully.",
      });
    } catch (err) {
      throw err;
    }
  }
}
