import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService)
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async register(data: CreateUserDto) {
    return await this.userService.createUser(data);
  }
  async login(data: LoginDto) {
    const { email, password } = data;
    const user: UserEntity = await this.userService.getUserByEmail(email);
    if (!user) return new NotFoundException('User not found');
    const match = await bcrypt.compare(password, user.password);
    if (!match) return new UnauthorizedException('Bad Credentials');

    const payload = {
      email,
      role: user.role,
      name: user.name,
    };

    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
    };
  }
}
