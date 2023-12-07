import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway/gateway.module';

const PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  await app.listen(PORT);
}

bootstrap();
