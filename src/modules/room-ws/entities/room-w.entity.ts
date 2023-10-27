import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Lot } from './lot.entity';

export type RoomDocument = HydratedDocument<Room>;

@Schema({})
export class Room {
    @Prop()
    id: string;

    @Prop()
    name: string;

    @Prop()
    host: string;

    @Prop()
    lots: Lot[];

    @Prop()
    password: string;

    @Prop()
    playersLimit: number;

    @Prop()
    startCash: number;

    @Prop()
    turnTime: number;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
