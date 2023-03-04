import { ValidationPipe } from './modules/common/pipes/validation.pipe';
import { ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CommonConfigRegister } from './modules/config/registers/common.register';
import * as colors from 'ansi-colors';

async function bootstrap() {
  const app = await createApp();
  createSwagger();
  listen();

  async function createApp() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();

    return app;
  }

  function createSwagger() {
    const config = new DocumentBuilder()
      .setTitle('Hippo')
      .setDescription('Hippo Swagger Document')
      .addBearerAuth({ type: 'apiKey', in: 'header', name: 'Authorization' })
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document, { explorer: true, swaggerOptions: { docExpansion: false } });
  }

  async function listen() {
    const commonConfig = app.select(AppModule).get<ConfigType<typeof CommonConfigRegister>>(CommonConfigRegister.KEY);
    await app.listen(commonConfig.port);
    console.log(colors.blue(`[Listening]: http://localhost:${commonConfig.port}`));
  }
}
bootstrap();
