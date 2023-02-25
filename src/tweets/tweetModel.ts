import * as mongoose from 'mongoose'

interface ITweet {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  content: string;
  media?: string;
  created_at: Date;
  updated_at: Date;
}


const TweetSchema = new mongoose.Schema({
  _id: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  content: String,
  media: String,
  created_at: Date,
  updated_at: Date
})

// Add single field index on user to fetch tweets from the user
TweetSchema.index({ user: 1 })


const TweetModel = mongoose.model('tweets', TweetSchema)

export { TweetModel, ITweet }