'use client';

import { Button } from '@shadcnui/button';

import { Heading } from '@/common/components/customize/Heading';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckedState } from '@radix-ui/react-checkbox';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@shadcnui/form';
import { Input } from '@shadcnui/input';
import { Loader2 } from 'lucide-react';
import { Checkbox } from 'raiz/src/common/components/shadcnui/checkbox';
import { Roles } from 'raiz/src/common/interfaces/configuracion';
import { useCreateOrUpdateRole } from 'raiz/src/hooks/useRoles';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const permisosSchema = z.object({
	name: z.string(),
	permission: z.object({
		create: z.boolean().default(false),
		delete: z.boolean().default(false),
		find: z.boolean().default(false),
		update: z.boolean().default(false),
	}),
});
const formSchema = z.object({
	id: z.number().optional(),
	name: z.string(),
	permission: z.array(permisosSchema),
});

export default function RoleForm({
	initialData,
	pageTitle,
	buttonTitle,
}: {
	initialData: Roles | null;
	pageTitle: string;
	buttonTitle: string;
}) {
	const { mutation } = useCreateOrUpdateRole();

	const defaultValues = {
		name: initialData?.name || '',
		permission: initialData?.permission || [
			{
				name: 'recipe',
				permission: {
					create: false,
					delete: false,
					find: false,
					update: false,
				},
			},
			{
				name: 'recipe-pending',
				permission: {
					create: false,
					delete: false,
					find: false,
					update: false,
				},
			},
			{
				name: 'role',
				permission: {
					create: false,
					delete: false,
					find: false,
					update: false,
				},
			},
			{
				name: 'users',
				permission: {
					create: false,
					delete: false,
					find: false,
					update: false,
				},
			},
			{
				name: 'category',
				permission: {
					create: false,
					delete: false,
					find: false,
					update: false,
				},
			},
			{
				name: 'category-group',
				permission: {
					create: false,
					delete: false,
					find: false,
					update: false,
				},
			},
		],
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		values: defaultValues,
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log('rolesssss:', values);
		try {
			const id = initialData?.id?.toString();

			await mutation.mutateAsync({ id, newRole: values });
		} catch (error) {
			console.error('Error al enviar el formulario:', error);
		}
	};
	const permissionFields = ['create', 'delete', 'find', 'update'] as const;
	const traduccionesPermisos: Record<string, string> = {
		create: 'crear',
		delete: 'eliminar',
		find: 'ver',
		update: 'actualizar',
	};
	return (
		<div className="mx-auto w-full">
			<Heading title={pageTitle} />

			<div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre del rol</FormLabel>
									<FormControl>
										<Input placeholder="Escriba el nombre del rol" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Campos para Permisos */}
						<div className="flex items-center flex-wrap gap-10">
							{[
								'recipe',
								'recipe-pending',
								'role',
								'users',
								'category',
								'category-group',
							].map((perm, index) => (
								<FormField
									key={perm}
									control={form.control}
									name={`permission.${index}.name`} // Explicitly referencing each item in array form
									render={() => (
										<FormItem>
											<FormLabel className="capitalize font-semibold">
												{perm}
											</FormLabel>
											<div className="flex items-center gap-3">
												{permissionFields.map((field) => (
													<FormField
														key={field}
														control={form.control}
														name={`permission.${index}.permission.${field}`}
														render={({ field }) => (
															<FormItem className="flex items-center flex-row-reverse gap-1 space-y-0">
																<FormLabel>
																	{
																		traduccionesPermisos[
																			field.name.split('.').pop() as string
																		]
																	}
																</FormLabel>
																<FormControl>
																	<Checkbox
																		checked={field.value as CheckedState}
																		onCheckedChange={field.onChange}
																	/>
																</FormControl>
															</FormItem>
														)}
													/>
												))}
											</div>
										</FormItem>
									)}
								/>
							))}
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
