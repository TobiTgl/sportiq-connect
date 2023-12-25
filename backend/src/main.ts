import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GatewayModule } from './gateway/gateway.module';
import * as admin from 'firebase-admin';
import credentials from './service-credentials.json';

const PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Cloud project API')
    .setDescription('The Cloud project API description.')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  admin.initializeApp({
    credential: admin.credential.cert(credentials as admin.ServiceAccount),
  });

  await app.listen(PORT);
}

bootstrap();
