// jwt.guard.ts
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common'
  import { Request } from 'express'
  import * as jwt from 'jsonwebtoken'
  
  @Injectable()
  export class JwtGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest<Request>()
      const authHeader = request.headers['authorization']
    
      // lay header ra
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Missing or invalid Authorization header')
      }
  
      const token = authHeader.split(' ')[1]
  
      try {
        const payload = jwt.verify(token, "cuongdz") // hoặc process.env.JWT_SECRET
        request['user'] = payload // đính kèm user vào request
        return true
      } catch (err) {
        throw new UnauthorizedException('Invalid or expired token')
      }
    }
  }