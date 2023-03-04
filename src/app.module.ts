import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configValidation } from './modules/config/config.validation';
import { CommonConfigRegister } from './modules/config/registers/common.register';
import { PoiModule } from './modules/poi/poi.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidation,
      validationOptions: { allowUnknown: true, abortEarly: true },
      load: [CommonConfigRegister],
    }),
    PoiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
