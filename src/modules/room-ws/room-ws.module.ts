import { Module } from '@nestjs/common';
import { RoomWsService } from './room-ws.service';
import { RoomWsGateway } from './room-ws.gateway';
import { RoomRepository } from './room-ws.repository';
import { Room, RoomSchema } from './entities/room-w.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])],
    providers: [RoomWsGateway, RoomWsService, RoomRepository],
})
export class RoomWsModule {}
