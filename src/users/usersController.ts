import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
  } from "tsoa";
  import { User } from "./user";
  import { UsersService } from "./usersService";
  
  @Route("users")
  export class UsersController extends Controller {
    @Get("{userId}")
    public async getUser(
      @Path() userId: number
    ): Promise<User> {
      return new UsersService().get(userId);
    }
  
    @SuccessResponse("201", "Created") // Custom success response
    @Post()
    public async createUser(
      @Body() requestBody: any
    ): Promise<void> {
      this.setStatus(201); // set return status 201
      new UsersService().create();
      return;
    }
  }