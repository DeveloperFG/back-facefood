import {json, Request, response, Response} from 'express'
import { CreateUserService } from '../../services/user/CreateUserService'
import { DetailUserService } from '../../services/user/DetailUserService'

class DetailUserController{
  async handle(req: Request, res: Response){
    
    const user_id = req.user_id;

    const detailUserService = new DetailUserService();

    const user = await detailUserService.execute(user_id);

    return res.json(user);
  }
}

export { DetailUserController }