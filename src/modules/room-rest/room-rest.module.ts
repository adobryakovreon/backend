import { Module } from '@nestjs/common';
import { RoomRestService } from './room-rest.service';
import { RoomRestController } from './room-rest.controller';

@Module({
  controllers: [RoomRestController],
  providers: [RoomRestService],
})
export class RoomRestModule {}
