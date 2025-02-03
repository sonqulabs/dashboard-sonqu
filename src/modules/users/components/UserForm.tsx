'use client';

import { Button } from '@shadcnui/button';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@shadcnui/form';
import { Input } from '@shadcnui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@shadcnui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Heading } from '@/common/components/customize/Heading';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@shadcnui/input-otp';
import { useCreateOrUpdateUser } from 'raiz/src/hooks/useUsers';
import { Roles, User } from 'raiz/src/common/interfaces/configuracion';
import { useRole } from 'raiz/src/hooks/useRoles';
import { useRouter } from 'next/navigation';
import { UsersService } from 'raiz/src/common/services/users.service';
const formSchema = z.object({
	password: z.string().min(2, {
		message: 'Product name must be at least 2 characters.',
	}),
	phone: z.string().min(2, {
		message: 'Product name must be at least 2 characters.',
	}),
	username: z.string().min(2, {
		message: 'Product name must be at least 2 characters.',
	}),
	role: z.string(),
	state: z.string(),
	email: z
		.string()
		.email('Por favor, introduce un correo electrónico válido')
		.optional()
		.or(z.literal('')),
});

export default function UserForm({
	initialData,
	pageTitle,
	buttonTitle,
}: {
	initialData: User | null;
	pageTitle: string;
	buttonTitle: string;
}) {
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const { mutation } = useCreateOrUpdateUser();
	const { data } = useRole();

	const defaultValues = {
		phone: initialData?.phone || '',
		username: initialData?.username || '',
		password: initialData?.password ? '******' : '',
		role: initialData?.role?.id?.toString() || '',
		state: initialData?.state || '',
		email: initialData?.email || '',
	};

	//hacer peticion de contraseña
	const { getUserPassword } = UsersService();

	const HandleFetchPassword = async () => {
		try {
			if (initialData != null) {
				const contrasena = await getUserPassword(String(initialData?.id));
				form.setValue('password', contrasena?.password || '');
			}

			setShowPassword(!showPassword); // Actual
		} catch (error) {
			console.error('Error al obtener la contraseña:', error);
		}
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		values: defaultValues,
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log('user:', values);
		try {
			const id = initialData?.id?.toString();
			const { role, email, password, ...otherValues } = values;
			const formattedValues = {
				roleId: Number(role),
				password: password === '******' ? null : password,
				email: email === '' ? null : email,
				...otherValues,
			};
			await mutation.mutateAsync({ id, newUser: formattedValues });
		} catch (error) {
			console.error('Error al enviar el formulario:', error);
		}
	}

	return (
		<div className="container mx-auto pb-10 pt-5">
			<button
				className="hover:underline text-sm mb-4"
				onClick={() => router.back()}
			>
				<span>{`<--`}</span> Volver
			</button>
			<Heading title={pageTitle} />

			<div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nombre Completo</FormLabel>
										<FormControl>
											<Input
												placeholder="Escriba su nombre y apellido"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Celular</FormLabel>
										<FormControl>
											{/* <Input placeholder="Escriba su celular" {...field} /> */}
											<InputOTP maxLength={9} {...field}>
												<InputOTPGroup>
													<InputOTPSlot index={0} />
													<InputOTPSlot index={1} />
													<InputOTPSlot index={2} />
												</InputOTPGroup>
												<InputOTPSeparator />
												<InputOTPGroup>
													<InputOTPSlot index={3} />
													<InputOTPSlot index={4} />
													<InputOTPSlot index={5} />
												</InputOTPGroup>
												<InputOTPSeparator />
												<InputOTPGroup>
													<InputOTPSlot index={6} />
													<InputOTPSlot index={7} />
													<InputOTPSlot index={8} />
												</InputOTPGroup>
											</InputOTP>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email (opcional)</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="ejemplo@dominio.com"
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
										<FormLabel htmlFor={field.name}>Contraseña</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													id={field.name}
													type={showPassword ? 'text' : 'password'}
													placeholder="********"
													{...field}
												/>
												<Button
													type="button"
													variant="ghost"
													size="icon"
													className="absolute right-0 top-0 h-full"
													onClick={HandleFetchPassword}
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
							{/* <FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Rol</FormLabel>
										<Select
											onValueChange={(value) => field.onChange(value)}
											value={field.value[field.value.length - 1]}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Selecciona un rol" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="beauty">admin</SelectItem>
												<SelectItem value="electronics">editor</SelectItem>
												<SelectItem value="clothing">
													comunity manager
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/> */}
							<FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Elige un rol</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Selecciona un rol" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{data?.map((item: Roles) => {
													return (
														<SelectItem
															key={item.id}
															value={item.id ? item.id.toString() : ''}
														>
															{item.name}
														</SelectItem>
													);
												})}
											</SelectContent>
										</Select>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="state"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Estado</FormLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Selecciona un estado" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="active">Activo</SelectItem>
												<SelectItem value="disable">Inactivo</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Button type="submit" disabled={mutation.isPending}>
							{mutation.isPending ? (
								<span className="flex items-center gap-2">
									{' '}
									<Loader2 className="mr-2 h-5 w-5 animate-spin" />
									cargando
								</span>
							) : (
								buttonTitle
							)}
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
