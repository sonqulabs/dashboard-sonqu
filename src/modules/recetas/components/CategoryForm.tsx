'use client';

import { Button } from '@shadcnui/button';

import { Heading } from '@/common/components/customize/Heading';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Loader2 } from 'lucide-react';
import { Category, CategoryGroup } from 'raiz/src/common/interfaces/recetas';
import { useCreateOrUpdateCategory } from 'raiz/src/hooks/useCategory';
import { useCategoryGroup } from 'raiz/src/hooks/useCategoryGroup';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Product name must be at least 2 characters.',
	}),
	group: z.string(),
});

export default function CategoryForm({
	initialData,
	pageTitle,
	buttonTitle,
}: {
	initialData: Category | null;
	pageTitle: string;
	buttonTitle: string;
}) {
	const { mutation } = useCreateOrUpdateCategory();

	const { data } = useCategoryGroup();

	const defaultValues = {
		name: initialData?.name || '',
		group: (initialData?.group && initialData.group.id?.toString()) || '',
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		values: defaultValues,
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const id = initialData?.id?.toString();
			const { name, group } = values;
			const formattedValues = {
				name,
				groupId: Number(group),
			};
			await mutation.mutateAsync({ id, newCategory: formattedValues });
		} catch (error) {
			console.error('Error al enviar el formulario:', error);
		}
	};

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
										<FormLabel>Nombre </FormLabel>
										<FormControl>
											<Input
												placeholder="Escriba el nombre de la categoría"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="group"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Grupo al que pertenece</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Selecciona un Grupo" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{data?.map((item: CategoryGroup) => {
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

							{/* <FormField
								control={form.control}
								name="group"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Grupo al que pertenece </FormLabel>
										<FormControl>
											<Input
												placeholder="Escriba el nombre de la categoría"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/> */}
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
