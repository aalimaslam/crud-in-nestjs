import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepo.findOne({ where: { email } });
    return user;
  }

  async createUser(data: CreateUserDto) {
    const newUser = this.userRepo.create({ ...data });
    await this.userRepo.save(newUser);
    return newUser;
  }
}
