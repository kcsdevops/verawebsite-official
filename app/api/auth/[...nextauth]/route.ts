import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import InstagramProvider from 'next-auth/providers/instagram';

export const dynamic = 'force-dynamic';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID || '',
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || '',
    })
  ],
  
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      // Log do login social
      console.log(`[AUTH] Login social realizado: ${user.email} via ${account?.provider}`);
      
      return true;
    },
    
    async jwt({ token, account, user }) {
      if (account && user) {
        token.provider = account.provider;
        token.userId = user.id;
      }
      return token;
    },
    
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).provider = token.provider as string;
        (session.user as any).userId = token.userId as string;
      }
      return session;
    },
    
    async redirect({ url, baseUrl }) {
      // Redirecionar para dashboard após login social
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    }
  },
  
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 horas
  },
  
  secret: process.env.NEXTAUTH_SECRET || 'veracare-nextauth-secret-2025',
  
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
