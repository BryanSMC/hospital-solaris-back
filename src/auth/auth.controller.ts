import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body()
    registerBodyDto: registerDto,
  ) {
    console.log(registerDto);

    return this.authService.register(registerBodyDto);
  }

  @Post('login')
  login(
    @Body()
    loginBodyDto: loginDto,
  ) {
    return this.authService.login(loginBodyDto);
  }
}
