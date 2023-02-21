import {
  Controller,
  ValidationPipe,
  Post,
  Body,
  Res,
  UsePipes,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private JwtService: JwtService,
  ) {}
  //run validation and sanatize the body of the request
  @UsePipes(ValidationPipe)
  @Post('register')
  async register(@Body() userData: CreateUserDto) {
    const hashed = await this.authService.hashPassword(userData.password);
    return this.userService.create({ ...userData, password: hashed });
  }
  @Post('login')
  async login(
    @Body() userData: { email: string; password: string },
    //injects the response object to add cookies with the response
    @Res({ passthrough: true }) response: Response,
  ) {
    const { email, password } = userData;
    const user = await this.authService.validateUserExists(email, password);
    if (user == false) {
      return 'Wrong email or password';
    } else {
      const token = this.JwtService.sign({ id: user._id });
      response.cookie('access-token', token);
      return token;
    }
  }
}
