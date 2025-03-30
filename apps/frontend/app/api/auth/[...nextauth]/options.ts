import { apiInstance } from '@/lib/api/instance'
import axios from 'axios'
import { NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await apiInstance.post(
    '/auth/refresh',
    {},
    {
      headers: {
        Authorization: `Refresh ${token.tokens.refreshToken}`
      }
    }
  )

  return {
    ...token,
    tokens: res.data
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const { email, password } = credentials

        try {
          const res = await axios.post(`${process.env.API_URL}/auth/login`, {
            email,
            password
          })
          return res.data
        } catch (e) {
          console.error('Wrong credentials')
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user)
        return {
          ...token,
          ...user
        }

      if (new Date().getTime() < token.tokens.expiresIn) return token

      return await refreshToken(token)
    },

    async session({ token, session }) {
      session.user = token.user
      session.tokens = token.tokens

      return session
    }
  },
  pages: {
    signIn: '/'
  }
}
