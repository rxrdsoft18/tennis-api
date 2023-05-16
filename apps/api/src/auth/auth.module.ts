import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AwsModule } from '@app/common';
import { PassportModule } from '@nestjs/passport';
import { JwtCognitoStrategy } from './jwt-cognito.strategy';

@Module({
  imports: [AwsModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [AuthController],
  providers: [JwtCognitoStrategy],
})
export class AuthModule {}
