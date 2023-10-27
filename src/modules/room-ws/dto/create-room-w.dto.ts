import { Room } from '../entities/room-w.entity';

export class CreateRoomDto {
    room: Room;

    socketId: string;
}
