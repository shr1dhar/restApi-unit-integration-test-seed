import { User } from "./user";


export class UsersService {
  public get(id: number): User {
    return {
      id: 123,
      email: "jane@doe.com",
      name: "Jane Doe",
    };
  }

  public create(): User {
    return {
      id: 123,
      email: "jane@doe.com",
      name: "Jane Doe",
    };
  }
}