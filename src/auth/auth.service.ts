import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { registerDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { loginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly UserService: UsersService) {}

  async register({ nombre, correo, contraseña }: registerDto) {
    const user = await this.UserService.findOneByEmail(correo);

    if (user) {
      throw new BadRequestException('El usuario ya existe');
    }

    return await this.UserService.create({
      nombre,
      correo,
      contraseña: await bcryptjs.hash(contraseña, 12),
    });
  }

  async login({ correo, contraseña }: loginDto) {
    const user = await this.UserService.findOneByEmail(correo);
    if (!user) {
      throw new UnauthorizedException('El correo no coincide');
    }

    const contraseñaValida = await bcryptjs.compare(
      contraseña,
      user.contraseña,
    );
    if (!contraseñaValida) {
      throw new UnauthorizedException('La contraseña no coincide');
    }

    return user;
  }
}
