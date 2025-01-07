import { User } from '../interfaces/configuracion';
import { httpsRequest } from './http-request.service';

export const UsersService = () => {
	const {
		get,
		post,
		put,
		delete: deleteRequest,
		configRequest,
	} = httpsRequest();

	const getUser = async (): Promise<User[]> => {
		configRequest({ endpoint: 'user' });
		const res = await get<User[]>();
		return res;
	};

	const getUserById = async (id: string): Promise<User> => {
		configRequest({ endpoint: `user/${id}` });
		const res = await get<User>();
		return res;
	};

	const createUser = async (data: User): Promise<User> => {
		configRequest({ endpoint: 'user' });
		const res = await post<User>(data);

		return res;
	};
	const updateUser = async (data: User, id: string): Promise<User> => {
		configRequest({ endpoint: `user/${id}` });
		const res = await put<User>(data);

		return res;
	};
	const deleteUser = async (id: string): Promise<void> => {
		configRequest({ endpoint: `user/${id}` });
		await deleteRequest();
	};

	const deleteUserIds = async (ids: string[]): Promise<void> => {
		configRequest({ endpoint: 'user' });
		const body = { ids };
		await deleteRequest(body);
	};

	return {
		getUser,
		getUserById,
		createUser,
		updateUser,
		deleteUser,
		deleteUserIds,
	};
};
