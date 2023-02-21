import { IsString, IsNotEmpty, Length, IsEmail } from 'class-validator';
export class CreateUserDto {
  id: any;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @Length(6)
  password: string;
  @IsString()
  @IsNotEmpty()
  address: string;
  @IsString()
  @IsNotEmpty()
  phone: string;
  addressBook?: { name: string; address: string }[];
}
