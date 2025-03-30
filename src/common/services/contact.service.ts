import { Contacto } from 'raiz/src/modules/contact/types';
import { httpsRequest } from './http-request.service';

export const ContactService = () => {
	const {
		get,
		post,
		put,
		delete: deleteRequest,
		configRequest,
	} = httpsRequest();

	const getContact = async (): Promise<Contacto[]> => {
		configRequest({ endpoint: 'contact' });
		const res = await get<Contacto[]>();
		return res;
	};

	const getContactById = async (id: string): Promise<Contacto> => {
		configRequest({ endpoint: `contact/${id}` });
		const res = await get<Contacto>();
		return res;
	};

	const createContact = async (data: Contacto): Promise<Contacto> => {
		configRequest({ endpoint: 'contact' });
		const res = await post<Contacto>(data);

		return res;
	};
	const updateContact = async (
		data: Contacto,
		id: string
	): Promise<Contacto> => {
		configRequest({ endpoint: `contact/${id}` });
		const res = await put<Contacto>(data);

		return res;
	};
	const deleteContact = async (id: string): Promise<void> => {
		configRequest({ endpoint: `contact/${id}` });
		await deleteRequest();
	};

	return {
		getContact,
		getContactById,
		createContact,
		updateContact,
		deleteContact,
	};
};
