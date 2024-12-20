import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { 
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @UseGuards(LocalAuthGuard)
    @Post('logout')
    async logout(@Request() req) {
        return req.logout();
    }
}