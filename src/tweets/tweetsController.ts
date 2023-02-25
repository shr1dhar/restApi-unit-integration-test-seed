import {
  Body,
  Controller,
  Get,
  Path,
  Res,
  Post,
  Patch,
  Delete,
  Query,
  Route,
  Request,
  Security,
  SuccessResponse,
  TsoaResponse
} from 'tsoa';
import * as mongoose from 'mongoose'

import { tweetCreateParams, updateTweetParams } from '../types/tweet';
import { TweetsService } from './tweetsService';
import { TweetModel, ITweet } from './tweetModel';

@Route('tweets')
export class TweetsController extends Controller {
  @Security('session')
  @Get("{tweetId}")
  public async getTweet(
    @Res() badReqest: TsoaResponse<400, { reason: string }>,
    @Path() tweetId: mongoose.Types.ObjectId,
    @Request() request: any
  ): Promise<any> {
    try {
      const tweet = await new TweetsService().get(tweetId) as ITweet;
      return tweet; 
    } catch (err: any) {
      return badReqest(400, { reason: err.message })
    }
  }

  
  @SuccessResponse('201', 'Created')
  @Security('session')
  @Post()
  public async createTweet(
    @Res() badReqest: TsoaResponse<400, { reason: string }>,
    @Body() requestBody: tweetCreateParams,
    @Request() request: any
  ): Promise<ITweet> {
    try {
      const tweet = await new TweetsService().create(requestBody, request.user.userId) as ITweet;
      this.setStatus(201);
      return tweet; 
      
    } catch (err: any) {
      return badReqest(400, { reason: err.message })
    }
  } 
  
  @Security('session')
  @Patch("{tweetId}")
  public async updateTweet(
    @Res() badReqest: TsoaResponse<400, { reason: string }>,
    @Path() tweetId: mongoose.Types.ObjectId,
    @Body() requestBody: updateTweetParams,
    @Request() request: any
  ): Promise<ITweet> {
    try {
      return await new TweetsService().update(requestBody, request.user.userId, tweetId) as ITweet;
      
    } catch (err: any) {
      return badReqest(400, { reason: err.message })
    }
  }
  
  @Security('session')
  @Delete("{tweetId}")
  public async deleteTweet(
    @Res() badReqest: TsoaResponse<400, { reason: string }>,
    @Path() tweetId: mongoose.Types.ObjectId,
    @Request() request: any
  ): Promise<void> {
    try {
      await new TweetsService().delete(tweetId);
      return; 
      
    } catch (err: any) {
      return badReqest(400, { reason: err.message })
    }
  }

 
}