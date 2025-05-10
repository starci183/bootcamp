import { CallHandler, Injectable, Logger, NestInterceptor } from "@nestjs/common"

import { ExecutionContext } from "@nestjs/common"
// rang tim hieu ve thu vien rxjs - hoi kho hieu. neu hieu dc thi no la cong cu rat manh de build back-end
// streaming data
import { Observable, tap, map } from "rxjs"

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TransformInterceptor.name)

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    return next.handle().pipe(
      map((data) => {
        return {
          message: 'Success',
          status: 200,
          data,
        }
      }),
    )
  }
}
