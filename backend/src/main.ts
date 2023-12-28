import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GatewayModule } from './gateway/gateway.module';

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

  await app.listen(PORT);
}

bootstrap();
