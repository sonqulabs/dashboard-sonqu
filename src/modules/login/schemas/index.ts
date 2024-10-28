import * as z from 'zod';

export const LoginSchema = z.object({
	email: z.string({ required_error: 'Email es requerido' }).email({
		message: 'Escriba un correo válido',
	}),
	passwords: z.string({ required_error: 'Este campo es requerido' }).min(1, {
		message: 'Escriba su contraseña',
	}),
	code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
	email: z.string().email({
		message: 'Email es requerido',
	}),
	password: z.string().min(6, {
		message: 'Mínimo 6 carácteres es requerido',
	}),
	name: z.string().min(1, {
		message: 'Name is requerido',
	}),
});
