import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const auth = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({token, user}){
      if(user?.email){
        const dbUser = await prisma.users.findUnique({
          where : {user_email : user.email}
        })

        if(dbUser){
          token.userId = dbUser.user_id
        }else{
          const newUser = await prisma.users.create({
            data : {
              user_name : user.name as string,
              user_email : user.email as string,
              user_icon : user.image as string | null,
            },
          })
          token.userId = newUser.user_id
        }
      }
      return token
    },

    async session({ session }) {
      if (session?.user?.email) {
        const user = await prisma.users.findUnique({
          where: { user_email: session.user.email },
        });

        if (user) {
          session.user.id = user.user_id.toString();
        }
      }
      return session;
    },

    async signIn({ user }) {
      if (user.email) {
        const existingUser = await prisma.users.findUnique({
          where: { user_email: user.email },
        });

        if (!existingUser) {
          await prisma.users.create({
            data: {
              user_email: user.email,
              user_name: user.name as string,
              user_icon: user.image as string | null,
            },
          });
        }
      }
      return true;
    },
  },
});

export const { handlers } = auth;
