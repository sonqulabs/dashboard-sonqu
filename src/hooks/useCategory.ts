import { useQuery } from '@tanstack/react-query';
import { getCategoryFunction } from '../common/api/category';

export const useCategory = () => {
	const {
		data = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['category'],
		queryFn: getCategoryFunction,
	});

	return { data, isLoading, isError };
};
