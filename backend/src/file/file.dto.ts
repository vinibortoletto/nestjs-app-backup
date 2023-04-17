import { IsNotEmpty, IsString } from 'class-validator';

export class FileDto {
  @IsString({ message: 'Arquivo inválido' })
  @IsNotEmpty({ message: 'Escolha um arquivo para enviar' })
  file: string;
}
