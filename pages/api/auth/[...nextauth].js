import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { loginAPI } from "@/API"
export const authOptions = {
    session: {
        jwt: true
    },
  // Configure one or more authentication providers
  providers: [
    Credentials({
        async authorize(credentials) {
            const data = {
                username: credentials.username,
                password: credentials.password
            }
          const {data:res} = await loginAPI(data)
          if(res.errorCode === 1) {
            return res.data
          }else {
            throw new Error(res.errorMessage)
          }
        }})
  ],
}
export default NextAuth(authOptions)