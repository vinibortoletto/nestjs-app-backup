import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './file.entity';
import * as csvtojson from 'csvtojson';
import { UserEntity } from 'src/user/user.entity';

interface ICsv {
  documento: string;
  saldo: number;
}

@Injectable({})
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async upload(file: Express.Multer.File, userId: string) {
    const csvObj: ICsv[] = await csvtojson().fromString(file.buffer.toString());
    const dic = {};

    csvObj.forEach((row: ICsv) => {
      const { documento, saldo } = row;

      if (documento in dic) {
        dic[documento] += Number(saldo);
      } else {
        dic[documento] = Number(saldo);
      }
    });

    const test = Object.entries(dic).map((item) => ({
      document: item[0],
      balance: item[1],
    }));

    const result = await Promise.all(
      test.map(async ({ document, balance }) => {
        const user = await this.userRepository.findOne({
          where: { id: userId },
        });

        console.log('user:', user);

        const instanceOfFile = this.fileRepository.create({
          user,
          document,
          balance: String(balance),
        });

        const newFile = await this.fileRepository.save(instanceOfFile);
        return newFile;
      }),
    );

    return result;
  }
}
