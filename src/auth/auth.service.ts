import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { UserDocument } from 'src/user/user.model';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  //helper function to hash the password
  async hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  }
  //helper function that checks if the user already exists in the database before logging
  //returns a promise of the user if it exists and false if the password or email are wrong
  async validateUserExists(
    email: string,
    password: string,
  ): Promise<UserDocument | false> {
    const exists = await this.userService.findOneByEmail(email);
    if (!exists) {
      return false;
    }
    const isPasswordCorrect = await this.userService.doesPasswordMatch(
      password,
      exists.password,
    );
    if (!isPasswordCorrect) {
      return false;
    }
    return exists;
  }
}
