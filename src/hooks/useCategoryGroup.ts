import { useQuery } from '@tanstack/react-query';
import { getCategoryGroupFunction } from '../common/api/categoryGroup';

export const useCategoryGroup = () => {
	const {
		data = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['categoryGroups'],
		queryFn: getCategoryGroupFunction,
	});

	return { data, isLoading, isError };
};
