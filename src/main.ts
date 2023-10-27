import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from './core/logger/logger.service';
import { Endpoints } from './core/constants/endpoints';
import { ApplicationConfigSchema } from './core/config/app.schema';
import { ConfigService } from '@nestjs/config';

export const config = new ConfigService<ApplicationConfigSchema>();


async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule, {
        logger: new Logger(),
    });

    app.enableCors();

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Рефакторинг виджета "Распределение заявок от REON"')
        .setDescription('Распределение заявок')
        .setVersion('0.0.1')
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup(`${Endpoints.Global}/docs`, app, document);

    await app.listen(config.get('PORT'), (): void => {
        app.get(Logger).info(`Ahhh shit...Here we go again: SERVER STARTED ON PORT ${config.get('PORT')}`, 'SERVER');
    });
}

bootstrap().then();
