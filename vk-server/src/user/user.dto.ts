import { prop } from '@typegoose/typegoose';
import { EnumGender } from './user.interface';
import { IsEnum, IsString } from 'class-validator';

export class UserDto {

  @IsString()
  name: string;

  @IsString()
  avatarPath: string;

  @IsString()
  birthDate: string;

  @IsString()
  city: string;

  @IsEnum(EnumGender)
  gender: EnumGender;


  @prop({ default: false })
  isVerified: boolean;
}