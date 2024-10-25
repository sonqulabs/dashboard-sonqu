'use client';
import * as z from 'zod';
import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/common/components/shadcnui/form';
import { Loader2 } from 'lucide-react';

import { Button } from '@/common/components/shadcnui/button';
import { FormError } from './form-error';
import { FormSuccess } from './form-exitoso';
import { LoginSchema } from '../schemas';
import { Input } from '@/common/components/shadcnui/input';

type ProductFormValues = z.infer<typeof LoginSchema>;

export function UserAuthForm() {
	const [loading, setLoading] = useTransition();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: ProductFormValues) => {
		console.log(data);
		// setError("");
		// setSuccess("");

		// setLoading(() => {
		//   Login(data)
		//     .then((values) => {
		//       if (values?.error) {
		//         setError(values.error);
		//       }

		//       if (values?.success) {
		//         setSuccess(values.success);
		//         window.location.replace("/validar-rol");
		//       }

		//     })
		//     .catch(() => setError("algun problema ocurrió"));
		// });
	};

	return (
		<div className="grid gap-6">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full space-y-8"
				>
					<div className="grid gap-2">
						<div className="grid gap-1">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Correo Eletrónico</FormLabel>
										<FormControl>
											<Input
												type="email"
												disabled={loading}
												placeholder="name@example.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Contraseña</FormLabel>
										<FormControl>
											<Input
												type="password"
												disabled={loading}
												{...field}
												placeholder="Escriba su contraseña"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormError message={error} />
						<FormSuccess message={success} />
						{loading ? (
							<Button disabled>
								<Loader2 className="mr-2 h-5 w-5 animate-spin" />
								Iniciar Sesión
							</Button>
						) : (
							<Button type="submit">
								{/* <IoEnterOutline className="mr-2 h-5 w-5" /> */}
								Iniciar Sesión
							</Button>
						)}
					</div>
				</form>
			</Form>
		</div>
	);
}
