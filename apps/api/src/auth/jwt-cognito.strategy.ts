import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, Logger } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtCognitoStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger(JwtCognitoStrategy.name);
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      audience: process.env.AWS_COGNITO_COGNITO_CLIENT_ID,
      issuer: process.env.AWS_COGNITO_AUTHORITY,
      algorithms: ['RS256'],
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.AWS_COGNITO_AUTHORITY + '/.well-known/jwks.json',
      }),
    });
  }

  async validate(payload: any) {
    this.logger.log(`payload: ${JSON.stringify(payload)}`);
    console.log(payload.email, 'email');

    return { idUser: payload.sub, email: payload.email };
  }
}
