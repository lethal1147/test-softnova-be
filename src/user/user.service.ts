import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import { CreateUserDTO } from "./dto/createUser.dto";
import { hashPassword } from "utils/authen";
import { handleSuccessResponse } from "utils/utils";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

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
