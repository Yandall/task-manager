import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Response<T> {
  data: T;
}

/**
 * Intercepts the response and set the message to a custom value.
 * It is intend to use only in create enpoints
 */
@Injectable()
export class InsertTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map(() => {
        const { output } = context.getArgByIndex(0);
        return output;
      })
    );
  }
}
