import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/mikro-orm/user.mikro-orm.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ConfigService],
  imports: [MikroOrmModule.forFeature({ entities: [User] })],
  exports: [UsersService],
})
export class UsersModule {}
