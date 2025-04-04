import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Res, Req, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../services/auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private configService: ConfigService) {
    }

    @Post('login')
    async login(@Body() signInDto: Record<string, any>, @Res() res: Response) {
        try {
            const response = await this.authService.signIn(signInDto.email, signInDto.password);
            if (!response) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

            // Generate refresh token
            const refreshToken = await this.authService.generateRefreshToken(response.user.id);

            // Set HTTP-Only Cookie
            res.cookie(this.configService.get<string>('JWT_SECRET_TOKEN') || 'session_token', response.token, {
                //httpOnly: true,  // Prevent XSS attacks
                secure: process.env.NODE_ENV === 'production', // Use secure cookie in production
                sameSite: 'strict',
                maxAge: parseFloat(this.configService.get<string>('JWT_REFRESH_SECRET_AGE') || '604800000') // 7 days expiration
            });

            // Set HTTP-Only Cookie for Refresh Token
            res.cookie('refresh_token', refreshToken, {
                // httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: parseFloat(this.configService.get<string>('JWT_SECRET_AGE') || '604800000') // 7 days expiration
            });

            // Return user data
            return res.json({ message: 'Login successful!', user: response.user });
        } catch (error) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }

    @Post('refresh')
    async refresh(@Req() req: Request, @Res() res: Response) {
        try {
            const refreshToken = req.cookies['refresh_token'];
            if (!refreshToken) throw new HttpException('Refresh token missing', HttpStatus.UNAUTHORIZED);

            // Generate a new access token
            const response = await this.authService.loginByRefreshToken(refreshToken);
            if (!response) throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);

            // Generate refresh token
            const refreshTokenNew = await this.authService.generateRefreshToken(response.user.id);

            // Set HTTP-Only Cookie
            res.cookie(this.configService.get<string>('JWT_SECRET_TOKEN') || 'session_token', response.token, {
                //httpOnly: true,  // Prevent XSS attacks
                secure: process.env.NODE_ENV === 'production', // Use secure cookie in production
                sameSite: 'strict',
                maxAge: parseFloat(this.configService.get<string>('JWT_REFRESH_SECRET_AGE') || '604800000') // 7 days expiration
            });

            // Set HTTP-Only Cookie for Refresh Token
            res.cookie('refresh_token', refreshTokenNew, {
                // httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: parseFloat(this.configService.get<string>('JWT_SECRET_AGE') || '604800000') // 7 days expiration
            });

            // Return user data
            return res.json({ message: 'Token refresh successful!', user: response.user });

        } catch (error) {
            throw new HttpException('Invalid or expired refresh token', HttpStatus.UNAUTHORIZED);
        }
    }

    @Post('logout')
    async logout(@Res() res: Response, @Req() req: Request) {
        res.clearCookie(this.configService.get<string>('JWT_SECRET_TOKEN') || 'session_token');
        return res.json({ message: 'Logged out successfully' });
    }
}