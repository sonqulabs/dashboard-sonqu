import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Contacto } from '../modules/contact/types';
import { ContactService } from '../common/services/contact.service';

const {
	getContact,
	createContact,
	getContactById,
	updateContact,
	deleteContact,
} = ContactService();

export const useContact = () => {
	const {
		data = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['categories'],
		queryFn: getContact,
	});

	return { data, isLoading, isError };
};

export const useContactById = (id: string, title: boolean) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['categoryId', id],
		queryFn: () => getContactById(id),
		enabled: !title,
	});

	return { data, isLoading, isError };
};

export const useCreateOrUpdateContact = () => {
	const router = useRouter();

	const mutation = useMutation({
		mutationFn: async (data: {
			id?: string;
			newContact: Omit<Contacto, 'id'>;
		}) => {
			if (data.id) {
				// Actualiza la categoría si hay un ID
				return await updateContact(data.newContact, data.id);
			} else {
				// Crea una nueva categoría si no hay ID
				return await createContact(data.newContact);
			}
		},
		onSuccess: () => {
			router.push('/recetas/categorias');
		},
		onError: (error) => {
			console.error('Error al crear o editar el grupo de categoría:', error);
		},
	});

	return { mutation };
};

export const useDeleteContact = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (id: string) => {
			return await deleteContact(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'] });
		},
		onError: (error) => {
			console.error('Error al crear o editar el grupo de categoría:', error);
		},
	});

	return { mutation };
};
