import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomRestService } from './room-rest.service';
import { CreateRoomRestDto } from './dto/create-room-rest.dto';
import { UpdateRoomRestDto } from './dto/update-room-rest.dto';

@Controller('room-rest')
export class RoomRestController {
  constructor(private readonly roomRestService: RoomRestService) {}

  @Post()
  create(@Body() createRoomRestDto: CreateRoomRestDto) {
    return this.roomRestService.create(createRoomRestDto);
  }

  @Get()
  findAll() {
    return this.roomRestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomRestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomRestDto: UpdateRoomRestDto) {
    return this.roomRestService.update(+id, updateRoomRestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomRestService.remove(+id);
  }
}
