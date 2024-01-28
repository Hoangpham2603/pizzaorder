import * as mongoose from 'mongoose'
import { getServerSession } from 'next-auth/react'
import { authOptions } from '../auth/[...nextauth]/route'
require('dotenv').config()

export async function PUT(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL)

    const data = await req.json()
    const session = await getServerSession(authOptions, req)

    console.log({ session })
    console.log('data123', data)
    if ('name' in data) {
      // Update username logic here
      // For example, assuming you have a User model:
      // const user = await User.findOneAndUpdate({ _id: session.userId }, { name: data.name });
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
