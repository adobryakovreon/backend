import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Logger } from '../core/logger/logger.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'process';
import { ScheduleModule } from '@nestjs/schedule';
import { RoomWsModule } from 'src/modules/room-ws/room-ws.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.${process.env.NODE_ENV}.env`,
            validationSchema: Joi.object({
                PORT: Joi.number().required(),
                MONGO_CONNECT: Joi.string().required(),
                MONGO_NAME: Joi.string().required(),
            }),
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get('MONGO_CONNECT'),
                dbName: configService.get('MONGO_NAME'),
            }),
            inject: [ConfigService],
        }),
        ScheduleModule.forRoot(),
        RoomWsModule,
    ],
    controllers: [AppController],
    providers: [AppService, Logger],
    exports: [Logger],
})
export class AppModule {}
