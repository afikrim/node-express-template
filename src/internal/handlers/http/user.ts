import { Request, Response, Router } from 'express';
import { CreateUserDto, UpdateUserDto } from 'src/internal/core/domain/user';
import { UserService } from 'src/internal/core/ports/services';
import { User } from 'src/internal/repositories/user/entity';
import { RequestParamsModel, RequestQueryModel } from './interfaces/request';
import { ResponseModel } from './interfaces/response';

const create =
  (service: UserService) =>
  async (
    req: Request<RequestParamsModel, any, CreateUserDto>,
    res: Response<ResponseModel>,
  ) => {
    const data = req.body;
    const [user, createUserError] = await service.create(data);
    if (createUserError)
      return res
        .status(500)
        .json({ status: 'fail', message: createUserError.message })
        .send();

    return res
      .status(201)
      .json({ status: 'success', message: 'Success', data: { user } })
      .send();
  };

const findAll =
  (service: UserService) =>
  async (
    req: Request<RequestParamsModel, any, any, RequestQueryModel<User>>,
    res: Response<ResponseModel>,
  ) => {
    const { limit, offset, orderby, sortby } = req.query;
    const [users, cursor, findAllUserError] = await service.findAll(
      {},
      offset ? +offset : undefined,
      limit ? +limit : undefined,
      sortby,
      orderby,
    );
    if (findAllUserError)
      return res
        .status(500)
        .json({ status: 'fail', message: findAllUserError.message })
        .send();

    return res
      .status(200)
      .json({
        status: 'success',
        message: 'Success',
        data: { users },
        meta: { cursor },
      })
      .send();
  };

const findOne =
  (service: UserService) =>
  async (
    req: Request<RequestParamsModel<{ userid: string }>>,
    res: Response<ResponseModel>,
  ) => {
    const [user, findOneError] = await service.findOne(+req.params.userid);
    if (findOneError)
      return res
        .status(500)
        .json({ status: 'fail', message: findOneError.message })
        .send();

    return res
      .status(200)
      .json({
        status: 'success',
        message: 'Success',
        data: { user },
      })
      .send();
  };

const update =
  (service: UserService) =>
  async (
    req: Request<RequestParamsModel<{ userid: string }>, any, UpdateUserDto>,
    res: Response<ResponseModel>,
  ) => {
    const userid = +req.params.userid;
    const data = req.body;
    const [user, updateError] = await service.update(userid, data);
    if (updateError)
      return res
        .status(500)
        .json({ status: 'fail', message: updateError.message })
        .send();

    return res
      .status(200)
      .json({
        status: 'success',
        message: 'Success',
        data: { user },
      })
      .send();
  };

const remove =
  (service: UserService) =>
  async (
    req: Request<RequestParamsModel<{ userid: string }>>,
    res: Response<ResponseModel>,
  ) => {
    const userid = +req.params.userid;
    const [user, removeError] = await service.remove(userid);
    if (removeError)
      return res
        .status(500)
        .json({ status: 'fail', message: removeError.message })
        .send();

    return res
      .status(200)
      .json({
        status: 'success',
        message: 'Success',
        data: { user },
      })
      .send();
  };

export const newUserHttpHandler = (
  service: UserService,
): { prefix: string; router: Router } => {
  const prefix = '/users';
  const router = Router();

  console.log('Start mapping routes from group: ' + prefix);

  console.log(`Registering POST ${prefix}/`);
  router.post('/', create(service));
  console.log(`Registering GET ${prefix}/`);
  router.get('/', findAll(service));
  console.log(`Registering GET ${prefix}/:userid`);
  router.get('/:userid', findOne(service));
  console.log(`Registering PATCH ${prefix}/:userid`);
  router.patch('/:userid', update(service));
  console.log(`Registering DELETE ${prefix}/:userid`);
  router.delete('/:userid', remove(service));

  return { prefix, router };
};
