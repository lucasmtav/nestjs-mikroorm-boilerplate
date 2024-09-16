import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/postgresql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { v7 as uuidv7 } from 'uuid';
import { UserRepository } from '../../../../repositories/mikro-orm/user.mikro-orm.repository';

@Entity({ repository: () => UserRepository })
export class User {
  [EntityRepositoryType]?: UserRepository;

  @PrimaryKey()
  id: string = uuidv7();

  @Property()
  @ApiProperty({ required: true, nullable: false })
  firstName: string;

  @Property()
  @ApiProperty({ required: true, nullable: false })
  lastName: string;

  @IsEmail()
  @Property()
  @ApiProperty({ required: true, nullable: false })
  email: string;

  @Property({ hidden: true })
  @ApiProperty({ required: true, nullable: false })
  password: string;

  @Property()
  @ApiProperty()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  @ApiProperty()
  updatedAt: Date = new Date();

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
