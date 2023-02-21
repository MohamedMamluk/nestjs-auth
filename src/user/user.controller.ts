import { Controller, Body, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDocument } from './user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id')
  async update(
    @Param('id') id: UserDocument['_id'],
    @Body() addressInfo: { name: string; address: string },
  ) {
    return this.userService.updateAddressBook(id, addressInfo);
  }
}
