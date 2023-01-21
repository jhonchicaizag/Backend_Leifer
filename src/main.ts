import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.use(json({ limit: '60mb' })); //establece el limite en la subida de payload en los controladores
  app.enableVersioning({
    //para mostrar el versionamiento del codigo en swagger
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Documentación API NEST')
    .setDescription('ruta de los end-points de esta api en NEST')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('awards')
    .addTag('courses')
    .addTag('videos')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT);
}
bootstrap();
