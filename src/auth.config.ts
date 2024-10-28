import CredentialsProvider from 'next-auth/providers/credentials';

import type { NextAuthConfig } from 'next-auth';

export default {
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				const authResponse = await fetch(
					`${process.env.API_LOCALHOST}/auth/login`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							username: credentials.email,
							password: credentials.password,
						}),
					}
				);
				if (!authResponse.ok) {
					return null;
				}

				const user = await authResponse.json();

				return user;
			},
		}),
	],
} satisfies NextAuthConfig;
