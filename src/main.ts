import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false, //Muốn tuỳ chỉnh body-parser
  });
  app.set('query parser', 'extended');
  await app.listen(3000);
}
bootstrap();
