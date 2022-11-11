import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (
  configServices: ConfigService,
): Promise<TypegooseModuleOptions> => ({
  uri: configServices.get('MONGO_URI'),
});
