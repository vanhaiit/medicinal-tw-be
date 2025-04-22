import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Socket')
@Controller('socket')
export class SocketController {}
