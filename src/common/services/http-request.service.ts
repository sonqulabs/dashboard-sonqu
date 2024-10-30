import Cookies from 'js-cookie';
import { TOKEN_NAME, IS_DEVELOP } from '@constants/services.constant';
import { BASE_MICROSERVICE } from '@constants/microservices.constant';

// const DOMAIN = 'sonqu';

type Headers = Record<string, string>;

interface RequestOptions {
	method: string;
	headers?: Headers;
	body?: string;
}

export default class HttpRequest {
	private baseURL: string;

	constructor(
		private microservice: string = BASE_MICROSERVICE,
		private version: string = 'v1',
		private headers: Headers = { 'Content-Type': 'application/json' }
	) {
		const port = IS_DEVELOP ? ':3004' : '';
		this.baseURL = `https://${this.microservice}${port}/api/${this.version}`;
	}

	// Método para agregar token de autorización
	private useToken() {
		const token = Cookies.get('tokenAuth');
		if (token) {
			this.headers['Authorization'] = `Bearer ${token}`;
		}
	}

	// Método genérico de petición
	private async request<T>(
		endpoint: string,
		options: RequestOptions
	): Promise<T> {
		this.useToken();

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_LOCALHOST}/${endpoint}`,
				{
					...options,
					headers: this.headers,
				}
			);

			if (!response.ok) {
				const errorDetails = await response.json(); // Obtener detalles del error
				throw new Error(
					`HTTP error! status: ${response.status}, message: ${errorDetails.message}`
				);
			}

			return await response.json();
		} catch (error) {
			console.error('Fetch error:', error);
			throw error; // Lanzar el error para ser manejado más arriba
		}
	}

	// Métodos CRUD
	public get<T>(endpoint: string): Promise<T> {
		return this.request<T>(endpoint, { method: 'GET' });
	}

	public post<T>(endpoint: string, data: unknown): Promise<T> {
		return this.request<T>(endpoint, {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	public put<T>(endpoint: string, data: unknown): Promise<T> {
		return this.request<T>(endpoint, {
			method: 'PATCH',
			body: JSON.stringify(data),
		});
	}

	public delete<T>(endpoint: string): Promise<T> {
		return this.request<T>(endpoint, { method: 'DELETE' });
	}
}
