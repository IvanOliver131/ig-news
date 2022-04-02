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
  secret: process.env.SECRET_JWT,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.SINGIN_KEY
  },
  callbacks: {
    async signIn({ user }) {
      const { email } = user;
      
      try {
        // Query faunaDB
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email)                  
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email }}
            ), 
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)                  
              )
            )
          )         
        );

        return true;
      } catch {
        return false;
      }     
    }
  }
})