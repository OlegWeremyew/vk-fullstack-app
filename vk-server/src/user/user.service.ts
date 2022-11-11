import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from './user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
  ) {
  }

  async getUser(_id: Types.ObjectId) {
    return this.UserModel.aggregate()
      .match({ _id })
      .lookup({
        from: 'Post',
        foreignField: 'user',
        localField: '_id',
        as: 'posts',
      })
      .addFields({
        postCounte: {
          $size: '$posts',
        },
      })
      .project({ __v: 0, posts: 0 })
      .exec()
      .then((data) => data[0]);
  }

  async byId(_id: Types.ObjectId) {
    const user = await this.UserModel.findById(_id, '-__v');
    if (!user) throw new UnauthorizedException('User not found');

    return user
  }

  async updateProfile(_id: Types.ObjectId, dto: UserDto) {
    const user = await this.byId(_id);

    user.name = dto.name
    user.city = dto.city
    user.birthDate = dto.birthDate
    user.gender = dto.gender
    user.avatarPath = dto.avatarPath

    return await user.save()
  }

  //TODO: Friends
  //TODO: Add and remove

}

