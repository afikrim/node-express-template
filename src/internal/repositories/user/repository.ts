import { hashSync, genSaltSync } from 'bcrypt';
import { Cursor, UserRepository } from 'src/internal/core/ports/repositories';
import { Knex } from 'knex';
import { User } from './entity';

const find =
  (db: Knex): UserRepository['find'] =>
  async (
    conditions,
    offset?: number,
    limit?: number,
    sortby?: keyof User,
    orderby?: 'asc' | 'desc',
  ) => {
    try {
      const query = db<User>('users').where(conditions);
      const totalQuery = query.clone().count('id', { as: 'id' }).first();
      if (offset) query.offset(offset);
      if (limit) query.limit(limit);
      if (sortby || orderby)
        query.orderBy(sortby || 'created_at', orderby || 'desc');

      const users: User[] = await query;
      const total: number = ((await totalQuery) as { id: number }).id;

      const cursor: Cursor = {
        current: offset || 0,
        next:
          offset && limit
            ? offset + limit <= total
              ? offset + limit
              : undefined
            : undefined,
      };

      return [users, cursor, undefined];
    } catch (err) {
      return [undefined, undefined, err as Error];
    }
  };

const findOne =
  (db: Knex): UserRepository['findOne'] =>
  async (id, conditions, sortby?: keyof User, orderby?: 'asc' | 'desc') => {
    try {
      const query = db<User>('users');
      if (id) query.where({ id: id });
      if (conditions) query.where(conditions);
      if (sortby || orderby)
        query.orderBy(sortby || 'created_at', orderby || 'desc');

      const user = await query.first();

      return [user, undefined];
    } catch (err) {
      return [undefined, err as Error];
    }
  };

const insert =
  (db: Knex): UserRepository['insert'] =>
  async (data) => {
    try {
      data.password = hashSync(data.password, genSaltSync());

      const result = await db<User>('users').insert(data);
      if (result[0] === 0) throw new Error('Something when wrong');

      return [undefined];
    } catch (err) {
      return [err as Error];
    }
  };

const update =
  (db: Knex): UserRepository['update'] =>
  async (id, conditions, data) => {
    try {
      const query = db<User>('users');
      if (id) query.where({ id: id });
      if (conditions) query.where(conditions);

      const user = await query.clone().first();
      if (!user) throw new Error('User not found');

      if (data.name) user.name = data.name;
      if (data.email) user.email = data.email;
      if (data.password)
        user.password = hashSync(data['password'], genSaltSync());

      const result = await query.clone().update(user);
      if (result === 0) throw new Error('Something went wrong.');

      return [undefined];
    } catch (err) {
      return [err as Error];
    }
  };

const remove =
  (db: Knex): UserRepository['remove'] =>
  async (id, conditions) => {
    try {
      const query = db<User>('users');
      if (id) query.where({ id: id });
      if (conditions) query.where(conditions);

      const user = await query.clone().first();
      if (!user) throw new Error('User not found');

      const result = await query.clone().delete();
      if (result === 0) throw new Error('Something went wrong.');

      return [undefined];
    } catch (err) {
      return [err as Error];
    }
  };

export const newUserRepository = (db: Knex): UserRepository => {
  return {
    find: find(db),
    findOne: findOne(db),
    insert: insert(db),
    update: update(db),
    remove: remove(db),
  };
};
