export const IS_DEVELOP = process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEV';
export const TOKEN_NAME =
	process.env.NEXT_PUBLIC_TOKEN_NAME || 'authjs.session-token';
