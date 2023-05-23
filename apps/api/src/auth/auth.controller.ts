import { Body, Controller, Logger, Post } from '@nestjs/common';
import {
  AuthLoginDto,
  AuthRegisterDto,
  AwsCognitoService,
  ChangePasswordDto,
  ConfirmPasswordDto,
  ForgotPasswordDto,
} from '@app/common';

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

  @Post('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    this.logger.log(changePasswordDto);
    return this.awsCognitoService.changeUserPassword(changePasswordDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.awsCognitoService.forgotUserPassword(forgotPasswordDto);
  }

  @Post('confirm-password')
  async confirmPassword(@Body() confirmPasswordDto: ConfirmPasswordDto) {
    return await this.awsCognitoService.confirmUserPassword(confirmPasswordDto);
  }
}
