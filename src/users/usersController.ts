import {
    Body,
    Controller,
    Get,
    Path,
    Res,
    Post,
    Query,
    Route,
    Request,
    Security,
    SuccessResponse,
    TsoaResponse
  } from 'tsoa';

  import { IUser } from './userModel';
  import { userCreateParams, loginParams } from '../types/user';
  import { UsersService } from './usersService';
  
  @Route('users')
  export class UsersController extends Controller {
    @Security('session')
    @Get()
    public async getUser(
      @Request() request: any
    ): Promise<Partial<IUser>> {
      return await new UsersService().get(request.user.username);
    }
  
    @SuccessResponse('201', 'Created')
    @Post()
    public async createUser(
      @Res() badReqest: TsoaResponse<400, { reason: string }>,
      @Body() requestBody: userCreateParams,
      @Request() request: any
    ): Promise<void> {
      try {

        const user: IUser = await new UsersService().create(requestBody);
        this.setStatus(201);
        request.session['username'] = user.username;
        return; 
        
      } catch (err: any) {
        console.error('Caught error', err)
        return badReqest(400, { reason: err.message })
      }
    }

    @Post('/login')
    public async loginUser(
      @Res() badReqest: TsoaResponse<400, { reason: string }>,
      @Body() loginBody: loginParams,
      @Request() request: any
    ): Promise<void> {
      try {

        const user = await new UsersService().validateUser(loginBody) as IUser;
        request.session['username'] = user.username;
        return; 
        
      } catch (err: any) {
        console.error('Caught error', err)
        return badReqest(400, { reason: err.message })
      }
    }
  }