'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@shadcnui/button';
import {
	FileInput,
	FileUploader,
	FileUploaderContent,
	FileUploaderItem,
} from '@shadcnui/file-upload';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@shadcnui/form';
import { CloudUpload } from 'lucide-react';
import Image from 'next/image';
import { Input } from 'raiz/src/common/components/shadcnui/input';
import { useState } from 'react';
// import { toast } from 'sonner';
import RichTextEditor from './TextEditor';
import { Textarea } from '@shadcnui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@shadcnui/select';
import { useCategory } from 'raiz/src/hooks/useCategory';
import { Category } from 'raiz/src/common/interfaces/recetas';
import { useCreateOrUpdateRecipe } from 'raiz/src/hooks/use-recipes';

const formSchema = z.object({
	ingredients: z.string().min(2, {
		message: 'about must be at least 2 characters.',
	}),
	instruction: z.string().min(2, {
		message: 'about must be at least 2 characters.',
	}),
	description: z.string(),
	title: z.string(),
	videoUrl: z.string(),
	prepTime: z.string(),
	category: z.string(),
	image: z
		.array(
			z.instanceof(File).refine((file) => file.size < 4 * 1024 * 1024, {
				message: 'File size must be less than 4MB',
			})
		)
		.max(5, {
			message: 'Maximum 5 files are allowed',
		})
		.nullable(),
});

export default function RecipesListForm() {
	const [files, setFiles] = useState<File[] | null>(null);
	const { data } = useCategory();
	const { mutation } = useCreateOrUpdateRecipe();
	const dropZoneConfig = {
		maxFiles: 1,
		maxSize: 1024 * 1024 * 4,
		multiple: false,
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			ingredients: '',
			title: '',
			videoUrl: '',
			prepTime: '',
			category: '',
			description: '',
			image: null,
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const formData = new FormData();

			// Agrega todos los valores del formulario
			formData.append('ingredients', values.ingredients);
			formData.append('instruction', values.instruction);
			formData.append('title', values.title);
			formData.append('description', values.description);
			formData.append('prepTime', values.prepTime);
			formData.append('videoUrl', values.videoUrl);
			formData.append('category', values.category);

			// Adjunta los archivos si están definidos
			if (files) {
				files.forEach((file, index) => {
					formData.append(`image[${index}]`, file);
				});
			}

			// Debug: Mostrar el contenido de FormData
			for (const pair of formData.entries()) {
				console.log(`${pair[0]}:`, pair[1]);
			}

			// Enviar el formulario usando la mutación
			await mutation.mutateAsync(formData);

			// Mensaje de éxito
			console.log('Formulario enviado con éxito');
		} catch (error) {
			console.error('Error al enviar el formulario:', error);
		}

		// toast.message('Event has been created', {
		// 	description: (
		// 		<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
		// 			<code className="text-white">{JSON.stringify(values, null, 2)}</code>
		// 		</pre>
		// 	),
		// });
	}

	return (
		<div className="w-full h-screen mx-auto space-y-20 max-w-[800px]">
			<h1 className="flex justify-center  text-2xl font-medium">
				Formulario para crear recetas
			</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Título</FormLabel>
								<FormControl>
									<Input
										placeholder="Escriba el título de la receta"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Descripcion</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Escriba una descripcion"
										className="resize-none"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Categorías</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Seleccione una" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{data?.map((item: Category) => {
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
						name="prepTime"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tiempo de preparación</FormLabel>
								<FormControl>
									<Input placeholder="Escriba el tiempo" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="videoUrl"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Url Youtube</FormLabel>
								<FormControl>
									<Input placeholder="Escriba o pegue una url" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="image"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Imagen de la Receta(1 sola imagen)</FormLabel>
								<FormControl>
									<FileUploader
										value={files}
										onValueChange={(newFiles) => {
											setFiles(newFiles);
											form.setValue('image', newFiles); // Sincronizar con react-hook-form
										}}
										dropzoneOptions={dropZoneConfig}
										className="relative bg-background rounded-lg p-0.5"
									>
										<FileInput
											id="fileInput"
											className="outline-dashed outline-1 outline-slate-500"
											{...field}
										>
											<div className="flex items-center justify-center flex-col p-2  w-full ">
												<CloudUpload className="text-gray-500 w-10 h-10" />
												<p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
													<span className="font-semibold">
														Click para cargar
													</span>
													&nbsp; o arraste y suelte
												</p>
												<p className="text-xs text-gray-500 dark:text-gray-400">
													SVG, PNG, JPG or GIF
												</p>
											</div>
										</FileInput>
										<FileUploaderContent>
											{files &&
												files.length > 0 &&
												files.map((file, i) => (
													<FileUploaderItem key={i} index={i}>
														<Image
															src={URL.createObjectURL(file)}
															alt={file.name}
															height={10}
															width={10}
															className=" p-0 object-cover rounded-full size-4"
														/>
														<span>{file.name}</span>
													</FileUploaderItem>
												))}
										</FileUploaderContent>
									</FileUploader>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="ingredients"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Ingredientes</FormLabel>
								<FormControl>
									<RichTextEditor {...field} />
								</FormControl>
								<FormDescription>
									Escribe tu lista de Ingredientes.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="instruction"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Instrucciones</FormLabel>
								<FormControl>
									<RichTextEditor {...field} />
								</FormControl>
								<FormDescription>
									Escribe tu lista de Instrucciones.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
}
