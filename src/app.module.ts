import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configValidation } from './config/config.validation';
import { CommonConfigRegister } from './config/registers/common.register';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidation,
      validationOptions: { allowUnknown: true, abortEarly: true },
      load: [CommonConfigRegister],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
