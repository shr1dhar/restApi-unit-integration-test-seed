import * as bcrypt from 'bcrypt'
import * as mongoose from 'mongoose'

import { IUser, UserModel } from './userModel';
import { userCreateParams, loginParams } from '../types/user';
import { ERROR_MSG } from '../constants';


export class UsersService {
  public async get(username: string): Promise<Partial<IUser | Error>> {

    const user = await UserModel.findOne({ username }) as IUser;

    if(!user){
      throw new Error(ERROR_MSG.NO_USER_FOUND);
    }
    
    return { username: user.username, name: user.name } ;
  }

  public async create(requestBody: userCreateParams): Promise<IUser> {
    const { username, name, password, city } = requestBody;
    const password_hash = await this.generatePasswordHash(password);
    try {
      const user = new UserModel({
        username: username.replace(/ /g,''),
        name,
        city,
        password_hash
      });
  
      return await user.save() as IUser;
    } catch(error){
      throw new Error(ERROR_MSG.USERNAME_NOT_AVAILABLE);
    }
    
  }

  public async validateUser(loginBody: loginParams): Promise<IUser | Error> {
    const { username, password } = loginBody;
    const user = await UserModel.findOne({ username }) as IUser;

    if(!user){
      throw new Error(ERROR_MSG.NO_USER_FOUND);
    }

    if(await this.comparePassword(password, user.password_hash)){
      return user;
    }

    throw new Error(ERROR_MSG.USERNAME_PASSWORD_MISMATCH);
  }

  private async generatePasswordHash(password: string): Promise<string>{
    const saltRounds = 10;
    
    const hash = await bcrypt.hashSync(password, saltRounds);
    return hash;
  }

  private async comparePassword(password: string, hash: string): Promise<boolean>{
    const verifyPassword = await bcrypt.compareSync(password, hash)
    return verifyPassword;
  }
  
}