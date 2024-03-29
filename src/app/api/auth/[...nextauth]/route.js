import { User } from '../../../../models/User'
import clientPromise from '../../../../libs/mongoConnect'
import * as mongoose from 'mongoose'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
require('dotenv').config()

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        username: { label: 'Email', type: 'email', placeholder: 'text@example.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const email = credentials?.username
        const password = credentials?.password

        try {
          // Connect to MongoDB
          await mongoose.connect(process.env.MONGO_URL)

          // Find the user by email
          const user = await User.findOne({ email })

          // Check if the user exists and the password is correct
          const passwordOK = user && bcrypt.compareSync(password, user.password)
          if (passwordOK) {
            return user
          }

          // Return null if user data could not be retrieved or password is incorrect
          return Promise.resolve(null)
        } catch (error) {
          console.error('Error during authorization:', error)
          return Promise.resolve(null)
        } finally {
          // Disconnect from MongoDB
          await mongoose.disconnect()
        }
      }
    })
  ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
