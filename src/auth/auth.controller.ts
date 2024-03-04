import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { Role } from './enums/rol.enum';
import { Auth } from './decorators/auth.decorator';

interface RequestWithUser extends Request {
  user: {
    correo: string;
    rol: string;
  };
}

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

  /* @Get('panel')
  @Roles(Role.DOCTOR)
  @UseGuards(AuthGuard, RolesGuard)
  getPanel(@Request() req: RequestWithUser) {
    return this.authService.panel(req.user);
  } */

  @Get('panel')
  @Auth(Role.DOCTOR)
  getPanel(@Request() req: RequestWithUser) {
    return this.authService.panel(req.user);
  }
}
