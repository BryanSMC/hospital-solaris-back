import {
  IsAlphanumeric,
  IsEmail,
  IsString,
  Matches,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @MinLength(4, { message: 'El nombre debe contener al menos 4 caracteres' })
  nombre: string;

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })
  correo: string;

  @IsAlphanumeric()
  @MinLength(8, {
    message: 'La contraseña debe contener al menos 8 caracteres',
  })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'La contraseña debe contener al menos una letra minúscula, una letra mayúscula y un número',
  })
  contraseña: string;
}
