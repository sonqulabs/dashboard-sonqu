/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth';
import authConfig from '@/auth.config';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	pages: {
		signIn: '/',
		signOut: '/',
	},
	callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user };
		},
		async session({ session, token }) {
			session.user = token as any;
			return session;
		},
		async redirect({ url, baseUrl }) {
			return `${baseUrl}`;
		},
	},
	session: { strategy: 'jwt' },
	...authConfig,
});
