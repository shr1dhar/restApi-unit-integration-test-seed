import * as mongoose from 'mongoose'

interface IUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  name: string;
}


const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
})

// Add single field index to be able to sort quickly
UserSchema.index({ email: 1 })


const UserModel = mongoose.model('users', UserSchema)

export { UserModel, IUser }