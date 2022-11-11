import { Body, Controller, Get, HttpCode, Param, Put, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from './decorators/user.decorators';
import { Types } from 'mongoose';
import { IdValidationPipe } from '../pipes/id.validation.pipe';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('_id') _id: Types.ObjectId) {
    return this.userService.getUser(_id);
  }

  @Get('by-id/:id')
  async getUser(@Param('id', IdValidationPipe) id: string) {
    return this.userService.getUser(new Types.ObjectId(id));
  }

  @UsePipes(new IdValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth() // Admin
  async updateUser(
    @Param('id', IdValidationPipe) id: Types.ObjectId,
    @Body() dto: UserDto,
  ) {
    return this.userService.updateProfile(id, dto);
  }
}
