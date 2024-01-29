import mongoose from 'mongoose'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { User } from '@/app/models/User'
require('dotenv').config()

export async function PUT(req) {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL)

    const data = await req.json()
    const session = await getServerSession(authOptions)
    const email = session.user.email

    console.log({ session })

    if ('name' in data) {
      // Update username logic here
      // For example, assuming you have a User model:
      const user = await User.updateOne({ email }, { name: data.name })
    }

    return Response.json(true)
  } catch (error) {
    console.error('Error during PUT request:', error)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect()
  }
}
