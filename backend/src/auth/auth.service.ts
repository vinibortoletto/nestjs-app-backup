import * as argon from 'argon2';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './dto/auth.dto';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { DuplicateEmailException } from './exceptions/DuplicateEmailException';

@Injectable({})
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async signUp({ email, password }: AuthDto) {
    const hasUser = await this.userRepository.findOne({ where: { email } });
    if (hasUser) throw new DuplicateEmailException();

    const hashedPassword = await argon.hash(password);

    const instanceOfUser = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    const unformattedUser = await this.userRepository.save(instanceOfUser);

    const formattedUser = this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.createdAt'])
      .where({ id: unformattedUser.id })
      .getOne();

    return formattedUser;
  }

  signIn() {
    return 'sign up';
  }
}
