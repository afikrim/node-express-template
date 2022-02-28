import { User } from 'src/internal/repositories/user/entity';
import { CreateUserDto, UpdateUserDto } from '../domain/user';

export type Cursor = {
  current: number;
  next?: number;
};

export type UserRepository = {
  find(
    conditions: Partial<User>,
    offset?: number,
    limit?: number,
    sortby?: keyof User,
    orderby?: 'asc' | 'desc',
  ): Promise<[User[] | undefined, Cursor | undefined, Error | undefined]>;
  findOne(
    id: User['id'] | undefined,
    conditions: Partial<User> | undefined,
    sortby?: keyof User,
    orderby?: 'asc' | 'desc',
  ): Promise<[User | undefined, Error | undefined]>;
  insert(data: CreateUserDto): Promise<[Error | undefined]>;
  update(
    id: User['id'] | undefined,
    conditions: Partial<User> | undefined,
    data: UpdateUserDto,
  ): Promise<[Error | undefined]>;
  remove(
    id: User['id'] | undefined,
    conditions: Partial<User> | undefined,
  ): Promise<[Error | undefined]>;
};
