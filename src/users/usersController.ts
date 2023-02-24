import {
    Body,
    Controller,
    Get,
    Path,
    Res,
    Post,
    Query,
    Route,
    SuccessResponse,
    TsoaResponse
  } from "tsoa";
  import { IUser } from "./user";
  import { UsersService } from "./usersService";
  
  @Route("users")
  export class UsersController extends Controller {
    @Get("{userId}")
    public async getUser(
      @Path() userId: number
    ): Promise<IUser> {
      return new UsersService().get(userId);
    }
  
    @SuccessResponse("201", "Created") // Custom success response
    @Post()
    public async createUser(
      @Res() badReqest: TsoaResponse<400, { reason: string }>,
      @Body() requestBody: Pick<IUser, "email" | "name">
    ): Promise<IUser> {
      try {
        console.log(requestBody)
        this.setStatus(201); // set return status 201
        return await new UsersService().create(requestBody);
      } catch (err: any) {
        console.error('Caught error', err)
        return badReqest(400, { reason: err.message })
      }
    }
  }