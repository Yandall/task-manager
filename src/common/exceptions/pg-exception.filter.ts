import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { QueryFailedError } from "typeorm";
import { Response } from "express";

@Catch()
export class PgExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (exception instanceof QueryFailedError) {
      const responseMessage: { message: string; statusCode: number } =
        this.errorCodes[exception.driverError.code] || this.defaultError;
      return response.status(responseMessage.statusCode).json(responseMessage);
    }
    return response.status(exception.status).json(exception.response);
  }

  private readonly defaultError = {
    message: "Internal server error",
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  };

  private readonly errorCodes = {
    23505: {
      message: "Error duplicate value",
      statusCode: HttpStatus.BAD_REQUEST,
      error: "Bad Request",
    },
  };
}
