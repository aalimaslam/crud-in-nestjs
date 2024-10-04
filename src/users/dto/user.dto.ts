export class UserDto {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}
