// logging.interceptor.ts
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
  } from '@nestjs/common'
  import { Observable, tap } from 'rxjs'
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name)
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const req = context.switchToHttp().getRequest()
      // lay request tu nguoi dung
      const { method, url } = req
      // tinh thoi gian bat dau
      const now = Date.now()
      // log request
      this.logger.debug(`Incoming Request Timestamp: ${now}`)
  
      // sau dong return thi no xu ly logic cho response
      return next.handle().pipe(
        tap(() => {
          // tinh thoi gian ket thuc
          // time nay la thoi gian tu luc response tra ve - thoi diem bat dau request
          const time = Date.now() - now
          // log response
          this.logger.debug(`Response Timestamp: ${time}`)
        }),
      )
    }
  }