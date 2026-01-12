import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import AllExceptionsFilter from './exceptions/all-exception.filter';
import { NotFoundExceptionFilter } from './exceptions/not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TODO: Need To Be Allow Cors Soon As Possible
  app.enableCors({ credentials: true });

  app.useGlobalFilters(new AllExceptionsFilter(), new NotFoundExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  await app.listen(process.env.PORT as string);
}

void bootstrap();
