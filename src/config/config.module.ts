import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configurations from 'config/configurations';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [configurations],
      isGlobal: true,
      envFilePath: '.env',
    }),

    /* 
       This line will load and parse a .env file from the project root directory, 
       merge key/value pairs from the .env file with environment variables assigned to process.env,
       and store the result in a private structure that you can access through the ConfigService.
    */
  ],
  providers: [ConfigService],
})
export class ConfigModule {}
