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
import { User } from '@/common/interfaces';
import { Heading } from '@/common/components/customize/Heading';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@shadcnui/input-otp';
const formSchema = z.object({
	passwords: z.string().min(2, {
		message: 'Product name must be at least 2 characters.',
	}),
	cel: z.string().min(2, {
		message: 'Product name must be at least 2 characters.',
	}),
	name: z.string().min(2, {
		message: 'Product name must be at least 2 characters.',
	}),
	role: z.string(),
	active: z.boolean(),
	email: z
		.string()
		.email('Por favor, introduce un correo electrónico válido')
		.optional()
		.or(z.literal('')),
});

export default function UserForm({
	initialData,
	pageTitle,
}: {
	initialData: User | null;
	pageTitle: string;
}) {
	const [showPassword, setShowPassword] = useState(false);

	const defaultValues = {
		cel: initialData?.cel || '',
		name: initialData?.name || '',
		passwords: initialData?.cel || '',
		role: initialData?.role || '',
		active: initialData?.active || false,
		email: initialData?.email || '',
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		values: defaultValues,
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<div className="mx-auto w-full">
			<Heading title={pageTitle} />

			<div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							<FormField
								control={form.control}
								name="name"
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
								name="cel"
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
								name="passwords"
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
													onClick={() => setShowPassword(!showPassword)}
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
							<FormField
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
							/>
							<FormField
								control={form.control}
								name="active"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Estado</FormLabel>
										<Select
											onValueChange={(value) =>
												field.onChange(value === 'true')
											}
											value={field.value.toString()}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Selecciona un estado" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="true">Activo</SelectItem>
												<SelectItem value="false">Inactivo</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Button type="submit">Crear Usuario</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
