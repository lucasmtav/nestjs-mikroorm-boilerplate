import { EntityRepository, wrap } from '@mikro-orm/postgresql';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { User } from '../../modules/users/entities/mikro-orm/user.mikro-orm.entity';

export class UserRepository extends EntityRepository<User> {
  async save(createUserDto: CreateUserDto): Promise<User> {
    const { firstName, lastName, email, password } = createUserDto;
    const user = new User(firstName, lastName, email, password);
    await this.em.persistAndFlush(user);
    return user;
  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneOrFail(id);
    wrap(user).assign(updateUserDto);
    await this.em.flush();
    return user;
  }
  findOneByEmail(email: string): Promise<User> {
    return this.findOne({ email });
  }
  async remove(id: string): Promise<User> {
    const user = await this.findOneOrFail(id);
    await this.nativeDelete({ id });
    return user;
  }
}
