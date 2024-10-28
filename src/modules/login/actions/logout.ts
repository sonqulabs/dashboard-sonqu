'use server';

import { signOut } from 'raiz/auth';

export const logout = async () => {
	await signOut();
};
