import { Roles } from '../interfaces/configuracion';
import { httpsRequest } from './http-request.service';

export const RolesService = () => {
	const {
		get,
		post,
		put,
		delete: deleteRequest,
		configRequest,
	} = httpsRequest();

	const getRole = async (): Promise<Roles[]> => {
		configRequest({ endpoint: 'role' });
		const res = await get<Roles[]>();
		return res;
	};

	const getRoleById = async (id: string): Promise<Roles> => {
		configRequest({ endpoint: `role/${id}` });
		const res = await get<Roles>();
		return res;
	};

	const createRole = async (data: Roles): Promise<Roles> => {
		configRequest({ endpoint: 'role' });
		const res = await post<Roles>(data);

		return res;
	};
	const updateRole = async (data: Roles, id: string): Promise<Roles> => {
		configRequest({ endpoint: `role/${id}` });
		const res = await put<Roles>(data);

		return res;
	};
	const deleteRole = async (id: string): Promise<void> => {
		configRequest({ endpoint: `role/${id}` });
		await deleteRequest();
	};

	return {
		getRole,
		getRoleById,
		createRole,
		updateRole,
		deleteRole,
	};
};
