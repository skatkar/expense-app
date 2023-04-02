import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Udemy - Nest JS course')
      .setDescription('The demo API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger-ui', app, document);
  }
  // whitelist ensures that only DTO properties are specified in the request body
  // if unknown properties/properties not defined in the DTO is provided, it'll ignore it.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); //enables DTO validations

  // enables URI versioning
  // Reference: https://docs.nestjs.com/techniques/versioning#uri-versioning-type
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(3000);
}
bootstrap();
