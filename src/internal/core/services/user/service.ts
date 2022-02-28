import { UserRepository } from 'src/internal/core/ports/repositories';
import { UserService } from 'src/internal/core/ports/services';
import { User } from 'src/internal/repositories/user/entity';

const create =
  (repository: UserRepository): UserService['create'] =>
  async (data) => {
    try {
      const [insertError] = await repository.insert(data);
      if (insertError) throw insertError;

      const [user, findOneError] = await repository.findOne(undefined, {
        email: data.email,
        name: data.name,
      });
      if (findOneError) throw findOneError;

      return [user, undefined];
    } catch (err) {
      return [undefined, err as Error];
    }
  };

const findAll =
  (repository: UserRepository): UserService['findAll'] =>
  async (
    conditions,
    offset?: number,
    limit?: number,
    sortby?: keyof User,
    orderby?: 'asc' | 'desc',
  ) => {
    try {
      const [users, cursor, findAllError] = await repository.find(
        conditions,
        offset,
        limit,
        sortby,
        orderby,
      );
      if (findAllError) throw findAllError;

      return [users, cursor, undefined];
    } catch (err) {
      return [undefined, undefined, err as Error];
    }
  };

const findOne =
  (repository: UserRepository): UserService['findOne'] =>
  async (id, sortby, orderby) => {
    try {
      const [user, findOneError] = await repository.findOne(
        id,
        undefined,
        sortby,
        orderby,
      );
      if (findOneError) throw findOneError;
      if (!user) throw new Error('User not found.');

      return [user, undefined];
    } catch (err) {
      return [undefined, err as Error];
    }
  };

const update =
  (repository: UserRepository): UserService['update'] =>
  async (id, data) => {
    try {
      const [, findOneError] = await findOne(repository)(id);
      if (findOneError) throw findOneError;

      const [updateError] = await repository.update(id, undefined, data);
      if (updateError) throw updateError;

      const [user] = await findOne(repository)(id);

      return [user, undefined];
    } catch (err) {
      return [undefined, err as Error];
    }
  };

const remove =
  (repository: UserRepository): UserService['remove'] =>
  async (id) => {
    try {
      const [user, findOneError] = await findOne(repository)(id);
      if (findOneError) throw findOneError;

      const [removeError] = await repository.remove(id, undefined);
      if (removeError) throw removeError;

      return [user, undefined];
    } catch (err) {
      return [undefined, err as Error];
    }
  };

export const newUserService = (repository: UserRepository): UserService => {
  return {
    create: create(repository),
    findAll: findAll(repository),
    findOne: findOne(repository),
    update: update(repository),
    remove: remove(repository),
  };
};
