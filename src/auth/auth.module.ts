import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt-strategy";
import { PrismaModule } from "src/common/prisma/prisma.module";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { AuthController } from "./auth.controller";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "1h" },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
