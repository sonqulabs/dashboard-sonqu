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
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CategoryGroup } from 'raiz/src/common/interfaces/recetas';
import { useCreateOrUpdateCategoryGroup } from 'raiz/src/hooks/useCategoryGroup';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Product name must be at least 2 characters.',
	}),
});

export default function GroupRecipesForm({
	initialData,
	pageTitle,
	buttonTitle,
}: {
	initialData: CategoryGroup | null;
	pageTitle: string;
	buttonTitle: string;
}) {
	const router = useRouter();
	const { mutation } = useCreateOrUpdateCategoryGroup();

	const defaultValues = {
		name: initialData?.name || '',
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		values: defaultValues,
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const id = initialData?.id?.toString();

			await mutation.mutateAsync({ id, newCategory: values });
		} catch (error) {
			console.error('Error al enviar el formulario:', error);
		}
	};

	return (
		<div className="mx-auto w-full">
			<button
				className="hover:underline text-sm mb-4"
				onClick={() => router.back()}
			>
				<span>{`<--`}</span> Volver
			</button>
			<Heading title={pageTitle} className="!text-xl" />

			<div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<div className="grid grid-cols-1 ">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nombre </FormLabel>
										<FormControl>
											<Input
												placeholder="Escriba el nombre del grupo de receta"
												{...field}
											/>
										</FormControl>
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
