import { Schema, model, models } from 'mongoose'
import bcrypt from 'bcrypt'
const UserSchema = new Schema(
  {
    email: { type: String, require: true, unique: true },
    password: {
      type: String,
      require: true,
      validate: (pass) => {
        if (!pass?.length || pass.length < 5) {
          new Error('password need to be at least 5 characters')
          return false
        }
        return true
      }
    }
  },
  { timestamps: true }
)

UserSchema.post('validate', function (user) {
  const notHashedpass = user.password
  const salt = bcrypt.genSaltSync(10)
  const hashedPass = bcrypt.hashSync(notHashedpass, salt)
  user.password = hashedPass
})

export const User = models?.User || model('User', UserSchema)
