import { auth } from 'raiz/auth';

export enum ENDPOINT_VERSION {
	v1 = 'v1',
	v2 = 'v2',
}

export type TYPE_ENDPOINT_VERSION = keyof typeof ENDPOINT_VERSION;

export interface HttpRequestParam {
	version?: TYPE_ENDPOINT_VERSION;
	endpoint: string;
	headers?: Record<string, string>;
}

export const httpsRequest = async () => {
	const session = await auth();
	console.log('asdsadsad', session);
	let endpoint = ''; // Cambiamos a let para poder modificarlo
	let headers: Record<string, string> = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${session?.user.token}`,
	};

	const configRequest = (param: HttpRequestParam) => {
		if (param.headers) {
			headers = { ...headers, ...param.headers }; // Merge de headers
		}
		endpoint = param.endpoint; // Asignamos el endpoint
	};

	const urlBuilder = () => {
		return `http://localhost:3004/api/v1/${endpoint}`; // Construimos la URL
	};

	async function get<T>(): Promise<T> {
		const url = urlBuilder(); // Llamamos a urlBuilder
		const response = await fetch(url, {
			method: 'GET', // Definimos el método
			headers, // Agregamos los headers
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status} - ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	}

	return {
		configRequest,
		urlBuilder,
		get,
	};
};
