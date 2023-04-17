import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './file.entity';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { UserEntity } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity, UserEntity])],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
