import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { ConfigService } from '@nestjs/config';
import { AuthLoginDto, AuthRegisterDto } from '@app/common';

@Injectable()
export class AwsCognitoService {
  private readonly userPool: CognitoUserPool;

  constructor(private readonly configService: ConfigService) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.configService.get('AWS_COGNITO_USER_POOL_ID'),
      ClientId: this.configService.get('AWS_COGNITO_CLIENT_ID'),
    });
  }

  async registerUser(authRegisterDto: AuthRegisterDto) {
    const { name, email, password, phone } = authRegisterDto;
    console.log(authRegisterDto, 'register');
    console.log(this.configService.get('AWS_COGNITO_USER_POOL_ID'), ' pool id');
    console.log(this.configService.get('AWS_COGNITO_CLIENT_ID'), ' client id');

    return new Promise((resolve, reject) => {
      this.userPool.signUp(
        email,
        password,
        [
          new CognitoUserAttribute({
            Name: 'phone_number',
            Value: phone,
          }),
          new CognitoUserAttribute({
            Name: 'name',
            Value: name,
          }),
        ],
        null,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result.user);
          }
        },
      );
    });
  }

  async authenticateUser(authLoginDto: AuthLoginDto) {
    const { email, password } = authLoginDto;
    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userCognito = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      userCognito.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve({
            accessToken: result.getAccessToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
          });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
}
