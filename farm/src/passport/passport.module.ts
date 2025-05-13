import { Module } from "@nestjs/common";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  // import passport module
  imports: [PassportModule],
  providers: [JwtStrategy],
})
export class PassportModule {}  
