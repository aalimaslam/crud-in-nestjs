import {
  BadRequestException,
  Body,
  Controller,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  async register(@Body() body: CreateUserDto) {
    if (!body || !body.name || !body.email || !body.password)
      return new BadRequestException('Please fill all the fields');
    return await this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    if (!body || !body.email || !body.password)
      return new BadRequestException('Please fill all the fields');
    return await this.authService.login(body);
  }
}
