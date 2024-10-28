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
import { Eye, EyeOff, Loader2, LogIn } from 'lucide-react';

import { Button } from '@/common/components/shadcnui/button';
import { FormError } from './form-error';
import { FormSuccess } from './form-exitoso';
import { LoginSchema } from '../schemas';
import { Input } from '@/common/components/shadcnui/input';
import { Login } from '../actions/login';

type ProductFormValues = z.infer<typeof LoginSchema>;

export function UserAuthForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useTransition();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			passwords: '',
		},
	});

	const onSubmit = async (data: ProductFormValues) => {
		setError('');
		setSuccess('');

		setLoading(() => {
			Login(data)
				.then((values) => {
					if (values?.error) {
						setError(values.error);
					}

					if (values?.success) {
						setSuccess(values.success);
						window.location.replace('/usuarios');
					}
				})
				.catch(() => setError('algun problema ocurrió'));
		});
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
								name="passwords"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor={field.name}>Contraseña</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													id={field.name}
													type={showPassword ? 'text' : 'password'}
													disabled={loading}
													placeholder="********"
													{...field}
												/>
												<Button
													type="button"
													variant="ghost"
													size="icon"
													className="absolute right-0 top-0 h-full"
													onClick={() => setShowPassword(!showPassword)}
													disabled={!field.value}
												>
													{showPassword ? (
														<EyeOff className="h-5 w-5" />
													) : (
														<Eye className="h-5 w-5" />
													)}
												</Button>
											</div>
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
								<LogIn className=" h-5 w-5" />
								Iniciar Sesión
							</Button>
						)}
					</div>
				</form>
			</Form>
		</div>
	);
}
