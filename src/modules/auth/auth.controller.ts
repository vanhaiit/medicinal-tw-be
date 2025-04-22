import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiPageOkResponse } from '@shared/decorators/api-ok-response.decorator';
import { AuthUser } from '@shared/decorators/auth-user.decorator';
import { AuthRoleGuard } from '@shared/decorators/http.decorator';
import { PublicRoute } from '@shared/decorators/public-route.decorator';
import { JwtPayloadDto } from '@shared/dtos/jwt-payload.dto';
import { Serialize } from '@shared/interceptors/serialize.interceptor';

import { AuthService } from './auth.service';
import {
    ChangePasswordRequestDto,
    ForgotPasswordRequestDto,
    LoginBodyRequestDto,
    SignUpRequestDto,
} from './dtos/auth.request.dto';
import {
    ForgotPasswordResponseDto,
    LoginResponseDto,
    SignUpResponseDto,
} from './dtos/auth.response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-up')
    @PublicRoute()
    @ApiPageOkResponse({ type: SignUpResponseDto, metadata: true })
    @Serialize(SignUpResponseDto, { withMeta: false })
    async signUp(@Body() body: SignUpRequestDto) {
        return await this.authService.signUp(body);
    }

    @Post('sign-in')
    @PublicRoute()
    @ApiPageOkResponse({ type: LoginResponseDto })
    @Serialize(LoginResponseDto, { withMeta: false })
    async login(@Body() body: LoginBodyRequestDto) {
        return await this.authService.login(body);
    }

    @Post('sign-out')
    @AuthRoleGuard([])
    logout(@AuthUser() user: JwtPayloadDto) {
        return this.authService.logout(user);
    }

    @Post('change-password')
    @AuthRoleGuard([])
    @ApiPageOkResponse({ type: SignUpResponseDto })
    @Serialize(SignUpResponseDto, { withMeta: false })
    changePassword(
        @AuthUser() user: JwtPayloadDto,
        @Body() body: ChangePasswordRequestDto,
    ) {
        return this.authService.changePassword(user.email, body);
    }

    @Post('forgot-password')
    @PublicRoute()
    @ApiPageOkResponse({ type: ForgotPasswordResponseDto })
    getSecretKey(@Body() body: ForgotPasswordRequestDto) {
        return this.authService.forgotPassword(body.email);
    }
}
