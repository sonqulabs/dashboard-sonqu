import { getSession } from 'next-auth/react';

// Definimos una enumeración para las versiones de los endpoints
enum ENDPOINT_VERSION {
	v1 = 'v1',
	v2 = 'v2',
}

// Definimos el tipo para los parámetros del request HTTP
interface HttpRequestParam {
	version?: ENDPOINT_VERSION; // Usamos directamente el tipo del enum
	endpoint: string;
	headers?: Record<string, string>;
}

// Función principal para manejar las solicitudes HTTP
export const httpsRequest = () => {
	let endpoint = '';
	let version: ENDPOINT_VERSION; // Declaramos la variable sin inicializar
	const defaultHeaders: Record<string, string> = {
		'Content-Type': 'application/json',
		Authorization: '', // Inicializamos el encabezado Authorization vacío
	};

	// Función para agregar el token al encabezado Authorization
	const addTokenHeaders = async () => {
		const session = await getSession();
		if (session?.user.token) {
			defaultHeaders.Authorization = `Bearer ${session.user.token}`;
		}
	};

	// Función para configurar los parámetros del request
	const configRequest = (param: HttpRequestParam) => {
		endpoint = param.endpoint;
		version = param.version ?? ENDPOINT_VERSION.v1; // Asignamos la versión, usando v1 como valor por defecto
		if (param.headers) {
			Object.assign(defaultHeaders, param.headers); // Combina encabezados
		}
	};

	// Construye la URL del endpoint
	const urlBuilder = () => `http://localhost:3004/api/${version}/${endpoint}`; // Usamos la versión del endpoint

	// Función auxiliar para manejar las solicitudes
	const request = async <T>(
		method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
		body?: T
	): Promise<T> => {
		await addTokenHeaders(); // Aseguramos que los encabezados estén actualizados

		const response = await fetch(urlBuilder(), {
			method,
			headers: defaultHeaders,
			body: body ? JSON.stringify(body) : undefined, // Convertimos el cuerpo a JSON solo si está presente
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status} - ${response.statusText}`);
		}

		return response.json(); // Retornamos el cuerpo de la respuesta en formato JSON
	};

	// Funciones específicas para cada tipo de petición
	const get = async <T>(): Promise<T> => request('GET');
	const post = async <T>(body: T): Promise<T> => request('POST', body);
	const put = async <T>(body: T): Promise<T> => request('PATCH', body);
	// const deleteRequest = async (): Promise<void> => request('DELETE'); // Para DELETE no necesitamos un cuerpo
	const deleteRequest = async <T>(body?: T): Promise<T> =>
		request('DELETE', body); // Cambié el tipo de retorno a T

	return {
		configRequest,
		get,
		post,
		put,
		delete: deleteRequest, // Renombramos deleteRequest a delete para ser más intuitivo
	};
};
