import NextAuth from 'next-auth';
import { authEdgeConfig } from './auth.edge.config';
import { authConfig } from './auth.config';

// Merge edge config with full config (providers from authConfig)
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authEdgeConfig,
  providers: authConfig.providers,
});
