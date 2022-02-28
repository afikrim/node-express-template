import { User } from 'src/internal/repositories/user/entity';
import { CreateUserDto, UpdateUserDto } from '../domain/user';

export type Cursor = {
  current: number;
  next?: number;
};

export type UserService = {
  create(data: CreateUserDto): Promise<[User | undefined, Error | undefined]>;
  findAll(
    conditions: Partial<User>,
    offset?: number,
    limit?: number,
    sortby?: keyof User,
    orderby?: 'asc' | 'desc',
  ): Promise<[User[] | undefined, Cursor | undefined, Error | undefined]>;
  findOne(
    id: User['id'] | undefined,
    sortby?: keyof User,
    orderby?: 'asc' | 'desc',
  ): Promise<[User | undefined, Error | undefined]>;
  update(
    id: User['id'] | undefined,
    data: UpdateUserDto,
  ): Promise<[User | undefined, Error | undefined]>;
  remove(
    id: User['id'] | undefined,
  ): Promise<[User | undefined, Error | undefined]>;
};
