import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Room } from './entities/room-w.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RoomRepository {
    constructor(@InjectModel(Room.name) private readonly roomModel: Model<Room>) {}

    public async create(createRoomDto: Room): Promise<Room> {
        try {
            return await this.roomModel.create(createRoomDto);
        } catch (error) {
            console.error(error);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async findOne(id: string) {
        try {
            const room = (await this.roomModel.findOne({ id })).toObject();
            return room;
        } catch (error) {
            console.error(error);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
