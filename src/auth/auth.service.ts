import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { registerDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ nombre, correo, contraseña }: registerDto) {
    const user = await this.UserService.findOneByEmail(correo);

    if (user) {
      throw new BadRequestException('El usuario ya existe');
    }

    await this.UserService.create({
      nombre,
      correo,
      contraseña: await bcryptjs.hash(contraseña, 12),
    });

    return {
      nombre,
      correo,
    };
  }

  async login({ correo, contraseña }: loginDto) {
    const user = await this.UserService.findByEmailWithPassword(correo);
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

    const payload = { email: user.correo, rol: user.rol };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      correo,
    };
  }

  async panel({ correo }: { correo: string; rol: string }) {
    return await this.UserService.findOneByEmail(correo);
  }
}
