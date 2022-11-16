import { ArgumentMetadata, BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import AppDataSource from './config/databaseConfig';
import { ValidationPipe422 } from './constants/validation.pipe';


async function bootstrap() {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!")
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err)
    })
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Project-training')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe422({
    }),
  );
  await app.listen(3000);
}
bootstrap();
