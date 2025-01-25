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

@Controller("api/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  getOneUser(@Param("id", ParseIntPipe) id: number) {
    return this.userService.getOneUser(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDTO) {
    return this.userService.createUser(body);
  }
}
