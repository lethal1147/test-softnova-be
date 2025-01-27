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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("User")
@Controller("api/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags("User")
  @ApiParam({
    name: "id",
    required: true,
    description: "The ID of the user to find",
    type: "number",
    example: 1,
  })
  @ApiOperation({
    summary: "Get a user by ID",
    description: "Retrieve a user details by their ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved the user.",
    schema: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            id: { type: "number", example: 1 },
            email: { type: "string", example: "user@example.com" },
            role: { type: "string", example: "user" },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-01T12:00:00Z",
            },
          },
        },
        message: { type: "string", example: "Get one user successfully." },
      },
    },
  })
  @Get(":id")
  getOneUser(@Param("id", ParseIntPipe) id: number) {
    return this.userService.getOneUser(id);
  }

  @ApiTags("User")
  @ApiOperation({
    summary: "Create a new user",
    description:
      "Create a new user account, with email and password. Ensures email uniqueness.",
  })
  @ApiResponse({
    status: 201,
    description: "Successfully created a user.",
    schema: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            id: { type: "number", example: 1 },
            email: { type: "string", example: "user@example.com" },
            role: { type: "string", example: "user" },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-01T12:00:00Z",
            },
          },
        },
        message: { type: "string", example: "Create user successfully." },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Email is already in use.",
    schema: {
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Email 'user@example.com' is already used.",
        },
      },
    },
  })
  @Post()
  createUser(@Body() body: CreateUserDTO) {
    return this.userService.createUser(body);
  }
}
