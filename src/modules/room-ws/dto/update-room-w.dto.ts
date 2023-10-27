import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room-w.dto';

export class UpdateRoomWDto extends PartialType(CreateRoomDto) {
    id: string;
}
