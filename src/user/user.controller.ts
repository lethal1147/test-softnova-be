import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/createUser.dto";
import { LoginBodyDTO } from "./dto/loginBody.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  getOneUser(@Param("id", ParseIntPipe) id: number) {
    return this.userService.getOneUser(id);
  }

  @Post("/login")
  login(@Body() body: LoginBodyDTO) {
    return this.login(body);
  }

  @Post()
  createUser(@Body() body: CreateUserDTO) {
    return this.createUser(body);
  }
}
