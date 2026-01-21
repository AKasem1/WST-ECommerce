import type { NextAuthConfig } from 'next-auth';

// Edge-compatible auth configuration for middleware
// This config MUST NOT import any Node.js modules or database connections
export const authEdgeConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'user' | 'admin';
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.JWT_SECRET,
  providers: [], // Providers will be added in the full config
};
