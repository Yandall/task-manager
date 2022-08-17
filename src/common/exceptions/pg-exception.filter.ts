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
      const driverError = exception.driverError;
      const responseMessage = {
        code: driverError.code,
        message: driverError.message,
        error: {
          constraint: driverError.constraint,
          detail: driverError.detail,
        },
      };
      return response.status(HttpStatus.BAD_REQUEST).json(responseMessage);
    }
    return response.status(exception.status).json(exception.response);
  }
}
