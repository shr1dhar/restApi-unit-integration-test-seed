
import { IUser, UserModel } from "./user";
import * as mongoose from 'mongoose'


export class UsersService {
  public get(id: number): IUser {
    return {
      _id: new mongoose.Types.ObjectId("63f82c913f6e9fb693986b84"),
      email: "jane@doe.com",
      name: "Jane Doe",
    };
  }

  public async create(requestBody: any): Promise<IUser> {
    const user = new UserModel(requestBody);

    return await user.save() as IUser;


  }
}