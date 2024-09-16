import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/repositories/mikro-orm/user.mikro-orm.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    // @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(
      this.configService.get('jwt.bcryptSaltOrRound'),
    );
    const hash = await bcrypt.hash(createUserDto.password, salt);
    const user = await this.userRepository.save(
      Object.assign(createUserDto, { password: hash }),
    );

    return user;
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id);
    return user;
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.update(id, updateUserDto);
    return user;
  }

  async remove(id: string) {
    const user = await this.userRepository.remove(id);
    return user;
  }
}
