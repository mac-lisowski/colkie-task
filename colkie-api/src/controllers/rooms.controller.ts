import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoomsCreateRequestDto } from 'src/dto/rooms-create.request.dto';
import { RoomsCreateResponseDto } from 'src/dto/rooms-create.response.dto';
import { RoomEntity } from 'src/entities/room.entity';
import { RoomsService } from 'src/services/rooms.service';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiOperation({ summary: 'Create room' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiOkResponse({ type: RoomsCreateResponseDto })
  async createRoom(
    @Body() roomsCreateDto: RoomsCreateRequestDto,
  ): Promise<RoomsCreateResponseDto> {
    const newRoomId = await this.roomsService.create(roomsCreateDto.name);

    return new RoomsCreateResponseDto(newRoomId);
  }
}
