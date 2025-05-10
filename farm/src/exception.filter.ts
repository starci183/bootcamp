// all-exceptions.filter.ts
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common'
  import { Request, Response } from 'express'
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name)
  
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        
        // status trong cai exception tra ve tu params
        let status =
          exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR
        
        
        let message =
          exception instanceof HttpException
            ? exception.getResponse()
            : 'Internal server error'

        // await then error vao
        //
    
        // Override 500 to 404
        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
          status = HttpStatus.NOT_FOUND
          message = 'Cuong dep trai'
        }
    
        this.logger.error(
          `Exception: ${request.method} ${request.url} - ${JSON.stringify(message)}`,
        )
    
        response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: typeof message === 'string' ? message : (message as any).message || message,
        })
    }
  }