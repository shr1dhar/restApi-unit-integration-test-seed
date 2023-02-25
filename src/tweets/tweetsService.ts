// @ts-nocheck
import * as mongoose from 'mongoose'

import { TweetModel, ITweet } from './tweetModel';
import { tweetCreateParams, updateTweetParams } from '../types/tweet';
import { ERROR_MSG } from '../constants';

export class TweetsService {
  public async get(tweetId: mongoose.Types.ObjectId): Promise<Partial<ITweet | Error>> {

    const tweet = await TweetModel.findOne({ _id: tweetId }) as ITweet;

    if(!tweet){
      throw new Error(ERROR_MSG.NO_TWEET_FOUND);
    }
    
    return tweet;
  }
  

  public async create(requestBody: tweetCreateParams, userId: mongoose.Types.ObjectId): Promise<ITweet | Error> {
    try {
      const tweet = new TweetModel({
        _id: new mongoose.Types.ObjectId(),
        ... requestBody,
        created_at: new Date(),
        updated_at: new Date(),
        user: userId
      });

      return await tweet.save();
    } catch(error){
      throw new Error(ERROR_MSG.TWEET_NOT_CREATED);
    }
  }

  public async update(requestBody: updateTweetParams,
    userId: mongoose.Types.ObjectId,
    tweetId: mongoose.Types.ObjectId): Promise<ITweet | Error> {
    
    const tweet = await TweetModel.findOne({ _id: tweetId }) as ITweet;

    if(!tweet){
      throw new Error(ERROR_MSG.NO_TWEET_FOUND);
    }

    if(tweet.user.toString() !== userId){
      throw new Error(ERROR_MSG.UPDATE_NOT_ALLOWED);
    }

    try {
      const updatedTweet = await TweetModel.findOneAndUpdate({ _id: tweetId },
        { "$set": { ...requestBody, updated_at: new Date() } },
        { returnOriginal: false }) as ITweet;
      return updatedTweet;
    } catch(error){
      throw new Error(ERROR_MSG.TWEET_NOT_UPDATED);
    }
  }

  public async delete(tweetId: mongoose.Types.ObjectId): Promise<void | Error> {
    try {
      return await TweetModel.findByIdAndRemove({ _id: tweetId });
    } catch(error){
      throw new Error(ERROR_MSG.INVALID_TWEET_ID);
    }
  } 
  
}