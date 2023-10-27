import { Injectable } from '@nestjs/common';
import { RoomRepository } from './room-ws.repository';
import { Room } from './entities/room-w.entity';

@Injectable()
export class RoomWsService {
    constructor(private readonly roomRepository: RoomRepository) {}

    public async create(createRoomDto: Room): Promise<Room> {
        return await this.roomRepository.create(createRoomDto);
    }

    findAll() {
        return `This action returns all roomWs`;
    }

    async findOne(id: string) {
        const room = await this.roomRepository.findOne(id);
        // console.log('find room:', room);
        return room;
    }

    // update(id: number, updateRoomWDto: UpdateRoomWDto) {
    //     return `This action updates a #${id} roomW`;
    // }

    remove(id: number) {
        return `This action removes a #${id} roomW`;
    }
}
