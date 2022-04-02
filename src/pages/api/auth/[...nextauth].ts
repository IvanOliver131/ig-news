import { query as q } from 'faunadb'

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { fauna } from '../../../services/fauna'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {params: { scope: 'read:user'}}
    }),
  ],
  jwt: {
   secret: process.env.SIGNIN_KEY,
  },
  callbacks: {
    async signIn({ user }) {
      const { email } = user;
      
      try {
        // Query faunaDB
        await fauna.query(
          q.Create(
            q.Collection('users'),
            { data: { email } }
          )
        );

        return true;
      } catch {
        return false;
      }     
    }
  }
})