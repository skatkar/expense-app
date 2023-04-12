import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = (await NestFactory.create(AppModule, {
    bufferLogs: true,
    abortOnError: false, // create a nest module and rethrow an error, instead of aborting the startup
  }).catch(console.error)) as INestApplication;

  app.enableCors();
  // whitelist ensures that only DTO properties specified in the request body wil be considered
  // if unknown properties OR properties not defined in the DTO are provided, it'll ignore it.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); //enables DTO validations

  // enables URI versioning
  // Reference: https://docs.nestjs.com/techniques/versioning#uri-versioning-type
  app.enableVersioning({
    type: VersioningType.URI,
  });

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Udemy - Nest JS course')
      .setDescription('The demo API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger-ui', app, document);
  }

  await app.listen(3000);
}
bootstrap();
