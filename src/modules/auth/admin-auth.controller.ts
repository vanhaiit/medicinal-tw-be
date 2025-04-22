import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

@ApiTags('Admin Auth')
@Controller('admin/auth')
export class AdminAuthController {
    constructor(private readonly authService: AuthService) {}
}
