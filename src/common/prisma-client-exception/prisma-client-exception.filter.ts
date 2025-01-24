import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { Response } from "express";

@Catch(PrismaClientKnownRequestError, PrismaClientValidationError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(
    exception: PrismaClientKnownRequestError | PrismaClientValidationError,
    host: ArgumentsHost,
  ) {
    const cxt = host.switchToHttp();
    const response = cxt.getResponse<Response>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal server error";

    if (exception instanceof PrismaClientKnownRequestError) {
      if (exception.code === "P2025") {
        status = HttpStatus.BAD_REQUEST;
        message = `Record not found in ${exception.meta?.modelName} table`;
      } else if (exception.code === "P2002") {
        status = HttpStatus.BAD_REQUEST;
        message = `Unique constraint failed on the ${exception.meta?.target} field`;
      } else if (exception.code === "P2003") {
        status = HttpStatus.BAD_REQUEST;
        message = `Foreign key constraint failed on ${exception.meta?.field_name}`;
      } else if (exception.code === "P2020") {
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = `Query parsing error: ${exception.message}`;
      } else {
        status = HttpStatus.BAD_REQUEST;
        message = exception.message;
      }
    }

    if (exception instanceof PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = `Validation error: ${exception.message}`;
    }

    const errorMessage = {
      statusCode: status,
      message: message,
      data: null,
    };

    response.status(status).json(errorMessage);
  }
}
