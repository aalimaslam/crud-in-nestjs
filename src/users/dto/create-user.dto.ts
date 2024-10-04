import { IsEmail, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Min(3)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Min(4)
  @Max(32)
  password: string;

  @IsNotEmpty()
  role: 'customer' | 'admin';
}
