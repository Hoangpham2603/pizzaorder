import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { User } from '../../../models/User'
require('dotenv').config()

export async function POST(req) {
  try {
    const body = await req.json()
    await mongoose.connect(process.env.MONGO_URL)

    const pass = body.password
    if (!pass?.length || pass.length < 5) {
      new Error('Password must be at least 5 characters')
    }

    const notHashedPassword = pass
    const salt = bcrypt.genSaltSync(10)
    body.password = bcrypt.hashSync(notHashedPassword, salt)

    const createdUser = await User.create(body)

    return Response.json({ user: createdUser, message: 'User created successfully' })
  } catch (error) {
    console.error('Error creating user:', error)
    return Response.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  } finally {
    // Close the database connection
    await mongoose.disconnect()
  }
}
