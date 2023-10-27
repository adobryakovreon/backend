import { PartialType } from '@nestjs/swagger';
import { CreateRoomRestDto } from './create-room-rest.dto';

export class UpdateRoomRestDto extends PartialType(CreateRoomRestDto) {}
