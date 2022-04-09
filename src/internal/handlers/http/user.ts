import { Request, Response, Router } from 'express';
import { routeMapping } from '../../../pkg/logger';
import { CreateUserDto, UpdateUserDto } from '../../core/domain/user';
import { UserService } from '../../core/ports/services';
import { User } from '../../repositories/user/entity';
import { RequestParamsModel, RequestQueryModel } from './interfaces/request';
import { ResponseModel } from './interfaces/response';

/**
 * @api {post} /api/v1/users Create new user data
 * @apiVersion 0.0.1
 * @apiName CreateUser
 * @apiGroup User
 *
 * @apiBody {String} name The new user name.
 * @apiBody {String} email The new user email.
 * @apiBody {String} password The new user password.
 *
 * @apiSuccess {Boolean} status Success status.
 * @apiSuccess {String} message Response message.
 * @apiSuccess {Object} data Response data.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 CREATED
 *    {
 *      "status": true,
 *      "message": "Successfully create new user.",
 *      "data": {}
 *    }
 *
 * @apiError {Boolean} status Success status.
 * @apiError {String} message Response message.
 * @apiError {Object} data Errors data.
 * @apiError {Object[]} data[errors]
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 400 OK
 *    {
 *      "status": false,
 *      "message": "Body doesn't match requirements.",
 *      "data": {
 *        "errors": []
 *      }
 *    }
 */
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

/**
 * @api {get} /api/v1/users Get all users data
 * @apiVersion 0.0.1
 * @apiName GetAllUsers
 * @apiGroup User
 *
 * @apiQuery {Number} limit=10
 * @apiQuery {Number} offset=0
 * @apiQuery {String} sortby=created_at
 * @apiQuery {String="asc","desc"} orderby=asc
 *
 * @apiSuccess {Boolean} status Success status.
 * @apiSuccess {String} message Response message.
 * @apiSuccess {Object} data Response data.
 * @apiSuccess {Object[]} data[users]
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "status": true,
 *      "message": "Successfully get all users.",
 *      "data": {
 *        "users": []
 *      }
 *    }
 *
 * @apiError {Boolean} status Success status.
 * @apiError {String} message Response message.
 * @apiError {Object} data Errors data.
 * @apiError {String[]} data[errors]
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 400 OK
 *    {
 *      "status": false,
 *      "message": "Params doesn't match requirements.",
 *      "data": {
 *        "errors": []
 *      }
 *    }
 */
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

/**
 * @api {get} /api/v1/users/:id Get a user
 * @apiVersion 0.0.1
 * @apiName GetAUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {Boolean} status Success status.
 * @apiSuccess {String} message Response message.
 * @apiSuccess {Object} data Response data.
 * @apiSuccess {Object} data[users]
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "status": true,
 *      "message": "Successfully get a user.",
 *      "data": {
 *        "users": {}
 *      }
 *    }
 *
 * @apiError {Boolean} status Success status.
 * @apiError {String} message Response message.
 *
 * @apiErrorExample NotFoundError-Response:
 *    HTTP/1.1 404 OK
 *    {
 *      "status": false,
 *      "message": "User with inputed ID not found."
 *    }
 */
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

/**
 * @api {put} /api/v1/users/:id Update a user
 * @apiVersion 0.0.1
 * @apiName UpdateAUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiBody {String} name The new user name.
 * @apiBody {String} email The new user email.
 * @apiBody {String} password The new user password.
 *
 * @apiSuccess {Boolean} status Success status.
 * @apiSuccess {String} message Response message.
 * @apiSuccess {Object} data Response data.
 * @apiSuccess {Object} data[users]
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "status": true,
 *      "message": "Successfully update a user.",
 *      "data": {
 *        "users": {}
 *      }
 *    }
 *
 * @apiError {Boolean} status Success status.
 * @apiError {String} message Response message.
 * @apiError {Object} [data] Error data.
 * @apiError {String[]} data[errors]
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 400 OK
 *    {
 *      "status": false,
 *      "message": "Params doesn't match requirements.",
 *      "data": {
 *        "errors": []
 *      }
 *    }
 *
 * @apiErrorExample NotFoundError-Response:
 *    HTTP/1.1 404 OK
 *    {
 *      "status": false,
 *      "message": "User with inputed ID not found."
 *    }
 */
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

/**
 * @api {delete} /api/v1/users/:id Remove a user
 * @apiVersion 0.0.1
 * @apiName RemoveAUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {Boolean} status Success status.
 * @apiSuccess {String} message Response message.
 * @apiSuccess {Object} data Response data.
 * @apiSuccess {Object} data[users]
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "status": true,
 *      "message": "Successfully remove a user.",
 *      "data": {
 *        "users": {}
 *      }
 *    }
 *
 * @apiError {Boolean} status Success status.
 * @apiError {String} message Response message.
 *
 * @apiErrorExample NotFoundError-Response:
 *    HTTP/1.1 404 OK
 *    {
 *      "status": false,
 *      "message": "User with inputed ID not found."
 *    }
 */
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

export const newUserHttpHandler = (service: UserService): [string, Router] => {
  const prefix = '/api/v1/users';
  const router = Router();

  router.post('/', create(service));
  router.get('/', findAll(service));
  router.get('/:userid', findOne(service));
  router.patch('/:userid', update(service));
  router.delete('/:userid', remove(service));

  routeMapping(prefix, router);
  return [prefix, router];
};
