import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

// injectable class
@Injectable()
// extends passport strategy
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // PassportStrategy la bo super
    //
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // key nay luu o bien moi truong
      secretOrKey: "cuongdz",
    });
  }

  // validate tuc la xac thuc token, va gan thong tin tu response tra ve vao request
  async validate(payload: any) {
    console.log(payload);
    return { userId: payload.userId };
  }
}