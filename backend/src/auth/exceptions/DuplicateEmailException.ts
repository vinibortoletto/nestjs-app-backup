import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateEmailException extends HttpException {
  constructor() {
    super(`Email fornecido já está em uso`, HttpStatus.BAD_REQUEST);
  }
}
