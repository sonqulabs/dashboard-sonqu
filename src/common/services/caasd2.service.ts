/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpsRequest } from './http-request2.service';

export const FotosService = async () => {
	const { get, configRequest } = await httpsRequest();

	const getCategory = async (): Promise<any> => {
		configRequest({ endpoint: `category` });
		const res = await get<any[]>();
		console.log(res);

		return res;
	};

	return {
		getCategory,
	};
};
