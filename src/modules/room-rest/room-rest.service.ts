import { Injectable } from '@nestjs/common';
import { CreateRoomRestDto } from './dto/create-room-rest.dto';
import { UpdateRoomRestDto } from './dto/update-room-rest.dto';

@Injectable()
export class RoomRestService {
  create(createRoomRestDto: CreateRoomRestDto) {
    return 'This action adds a new roomRest';
  }

  findAll() {
    return `This action returns all roomRest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roomRest`;
  }

  update(id: number, updateRoomRestDto: UpdateRoomRestDto) {
    return `This action updates a #${id} roomRest`;
  }

  remove(id: number) {
    return `This action removes a #${id} roomRest`;
  }
}
