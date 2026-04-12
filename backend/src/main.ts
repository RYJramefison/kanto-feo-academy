import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Activer CORS pour le frontend
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Charger la spécification OpenAPI depuis le fichier YAML
  const openApiSpecPath = path.join(__dirname, '..', '..', 'openapi-spec.yml');
  const openApiDocument = yaml.load(
    fs.readFileSync(openApiSpecPath, 'utf8'),
  ) as OpenAPIObject;

  // Configurer Swagger avec le document externe
  SwaggerModule.setup('api', app, openApiDocument);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => console.error(err));
