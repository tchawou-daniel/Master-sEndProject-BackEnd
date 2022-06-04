import { TransformInterceptor } from '@api/transform.repository';
import { ValidationPipe, Logger } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors: CorsOptions = {
    origin: ['http://localhost:3000'],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: [
      'Accept',
      'Content-Type',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Headers',
    ],
  };
  const options = new DocumentBuilder()
    .setTitle('Empreintt Solution')
    .setDescription(
      'Empreintt is a company contracted to hire and staff employees for other companies',
    )
    .setVersion('0.0')
    .addTag('empreintt')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  // app.use(helmet());
  app.enableCors(cors);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  const port = process.env.PORT;
  await app.listen(port);
}
bootstrap();
