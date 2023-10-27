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
    public async joinRoom(@MessageBody() { roomId, userName }: { roomId: string; userName: string }, @ConnectedSocket() client: Socket) {
        const room = await this.roomWsService.findOne(roomId);
        client.join(room.id);
        const sockedRoom = this.server.sockets.adapter.rooms.get(room.id);
        if (sockedRoom.size <= room.playersLimit) {
            await this.roomWsService.addUserInRoom(userName, roomId);
            const RRoom = await this.roomWsService.findOne(roomId);
            this.server.to(client.id).emit('sendRoom', RRoom);
            this.server
                .to(room.id)
                .except(client.id)
                .emit(`room_join`, {
                    message: `user ${userName} join`,
                    joinName: userName,
                    socketId: client.id,
                });
        } else {
            console.log('max users limit');
            client.leave(room.id);
        }
    }

    @SubscribeMessage('leaveRoom')
    public leaveRoom(@MessageBody() { roomId, userName }: { roomId: string; userName: string }, @ConnectedSocket() client: Socket) {
        console.log(userName);
        this.roomWsService.kickUserFromRoom(userName, roomId);
        client.broadcast.to(roomId).emit(`room_leave`, {
            message: `user ${userName} leave`,
        });
        client.leave(roomId);
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
