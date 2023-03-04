import { ValidationPipe } from './modules/common/pipes/validation.pipe';
import { ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CommonConfigRegister } from './modules/config/registers/common.register';
import * as colors from 'ansi-colors';
import { networkInterfaces } from 'os';

function getIpList() {
  const nets = networkInterfaces();
  const ipList = [];
  Object.keys(nets)
    .filter(netKey => !netKey.startsWith('br') && !netKey.startsWith('lo'))
    .forEach(netKey => {
      ipList.push(
        ...nets[netKey].filter(netVal => netVal.family === 'IPv4' && !netVal.internal).map(netVal => netVal.address),
      );
    });

  return ipList;
}

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
    logIpInfo(commonConfig.port);
  }

  function logIpInfo(port: number) {
    const ipList = getIpList();
    ipList.forEach(ip => {
      console.log(colors.blue(`[Maybe Listening]: http://127.0.0.1:${port}`));
      console.log(colors.blue(`[Maybe Listening]: http://${ip}:${port}`));
    });
  }
}
bootstrap();
