import { Transform } from 'class-transformer';
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class loginDto {
  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsString()
  @Transform(({ value }) => value.trim())
  correo: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'La contraseña debe contener al menos una letra minúscula, una letra mayúscula y un número',
  })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @MinLength(8, {
    message: 'La contraseña debe contener al menos 8 caracteres',
  })
  @IsAlphanumeric()
  @Transform(({ value }) => value.trim())
  contraseña: string;
}
