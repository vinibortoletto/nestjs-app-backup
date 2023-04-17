import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: AuthDto) {
    return this.service.signUp(dto);
  }

  @Post('signin')
  signIin() {
    return this.service.signIn();
  }
}
