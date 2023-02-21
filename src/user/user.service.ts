import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  //Injecting the user model to have access to mongoose methods
  //Defined the type of the model for further usage
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}
  //create function takes a CreateUserDTO that will be validated from the POST request
  //Returns a promise of either the CreateUserDTO while omitting the password using Typescript
  //or an error string
  async create(
    createUserDto: CreateUserDto,
  ): Promise<Omit<CreateUserDto, 'password'> | string> {
    const doesUserExist = await this.findOneByEmail(createUserDto.email);
    if (doesUserExist) {
      return 'User already Exists';
    }
    const user = await this.UserModel.create(createUserDto);
    //Returns the user without the password
    return this.getUserDetails(user);
  }
  //private method that takes a user from mongoose and returns the data without password
  private getUserDetails(user: UserDocument): Omit<CreateUserDto, 'password'> {
    return {
      id: user._id,
      address: user.address,
      email: user.email,
      name: user.name,
      phone: user.phone,
      addressBook: user.addressBook,
    };
  }
  //method that access the userModel and returns a promise of the user that match the email provided
  async findOneByEmail(email: CreateUserDto['email']): Promise<UserDocument> {
    return this.UserModel.findOne({ email });
  }
  //helper method the compares the password coming from the user with the hashed password
  // returns true if both match
  async doesPasswordMatch(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  //gets the data of the user that matches the id provided and adds the new address
  //returns the user wihout the password

  async updateAddressBook(
    id: UserDocument['_id'],
    addressInfo: { name: string; address: string },
  ) {
    const user = await this.UserModel.findById(id);
    user.addressBook = [...user.addressBook, addressInfo];

    return this.getUserDetails(await user.save());
  }
}
