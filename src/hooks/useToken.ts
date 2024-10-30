import { auth } from 'raiz/auth';

export const useToken = async () => {
	const session = await auth();

	return { token: `${session?.user.token}` };
};
