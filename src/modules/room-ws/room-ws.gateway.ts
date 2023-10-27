import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { WebSocketServer, MessageBody } from '@nestjs/websockets';
import { RoomWsService } from './room-ws.service';
import { CreateRoomDto } from './dto/create-room-w.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class RoomWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly roomWsService: RoomWsService) {}

    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket) {
        console.log(`client ${client.id} connected`);
    }

    handleDisconnect(client: Socket) {
        console.log(`client ${client.id} disconnected`);
    }

    @SubscribeMessage('createRoomWs')
    async create(@MessageBody() createRoomDto: CreateRoomDto) {
        const newRoom = await this.roomWsService.create(createRoomDto.room);
        const host = this.server.sockets.sockets.get(createRoomDto.socketId);
        host.join(newRoom.id);
    }

    @SubscribeMessage('findAllRoomWs')
    findAll() {
        return this.roomWsService.findAll();
    }

    @SubscribeMessage('joinRoom')
    public async joinRoom(@MessageBody() { id, userName }: { id: string; userName: string }, @ConnectedSocket() client: Socket) {
        const room = await this.roomWsService.findOne(id);
        client.join(room.id);
        const sockedRoom = this.server.sockets.adapter.rooms.get(room.id);
        if (sockedRoom.size <= room.playersLimit) {
            // console.log(room);

            // if (this.server.sockets.adapter.rooms.get(id).size < room.playersLimit) {
            // client.join(id);
            client.broadcast.to(room.id).emit(`room_${room.id}_join`, {
                message: `user ${userName} join`,
            });
            // this.server.to(id).emit(`room_${room.id}_join`, `user ${client.id} join`);
        } else {
            console.log('max users limit');
            client.leave(room.id);
        }
    }

    @SubscribeMessage('leaveRoom')
    public leaveRoom(@MessageBody() id: string, @ConnectedSocket() client: Socket) {
        client.broadcast.to(id).emit(`room_${id}_message`, {
            message: `user ${client.id} leave`,
        });
        client.leave(id);
    }

    // @SubscribeMessage('updateRoomW')
    // update(@MessageBody() updateRoomWDto: UpdateRoomWDto) {
    //     return this.roomWsService.update(updateRoomWDto.id, updateRoomWDto);
    // }

    // @SubscribeMessage('removeRoomW')
    // remove(@MessageBody() id: number) {
    //     return this.roomWsService.remove(id);
    // }
}
