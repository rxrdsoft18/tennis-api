import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthLoginDto, AuthRegisterDto, AwsCognitoService } from '@app/common';

@Controller('v1/auth')
export class AuthController {
  protected readonly logger = new Logger(AuthController.name);

  constructor(private readonly awsCognitoService: AwsCognitoService) {}

  @Post('register')
  async register(@Body() authRegisterDto: AuthRegisterDto) {
    return this.awsCognitoService.registerUser(authRegisterDto);
  }

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    this.logger.log(authLoginDto);
    console.log(process.env.AWS_COGNITO_AUTHORITY);
    return this.awsCognitoService.authenticateUser(authLoginDto);
  }
}
