import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/common/prisma/prisma.service";
import { comparePassword } from "utils/authen";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async login(user: { email: string; id: number }) {
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get("JWT_SECRET"),
    });

    return { accessToken: token, user };
  }

  async validateUser({ email, password }: { email: string; password: string }) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
        deletedAt: null,
      },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
      },
    });
    if (!user) return null;

    const isCorrectPassword = await comparePassword(password, user.password);
    if (!isCorrectPassword) return null;
    return { id: user.id, email: user.email, role: user.role };
  }
}
