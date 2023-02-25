import * as mongoose from 'mongoose'

interface IUser {
  _id: mongoose.Types.ObjectId;
  username: string;
  name: string;
  city?: string;
  password_hash: string;
}


const UserSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  city: String,
  password_hash: String,
})

// Add single field index to be able to serach on username
UserSchema.index({ username: 1 })


const UserModel = mongoose.model('users', UserSchema)

export { UserModel, IUser }