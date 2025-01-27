'use client';
import { columnsUser } from 'raiz/src/app/(dashboard)/usuarios/columns';
import { DataTableUsers } from 'raiz/src/app/(dashboard)/usuarios/data-table';
import { Heading } from 'raiz/src/common/components/customize/Heading';
import { useUser } from 'raiz/src/hooks/useUsers';

export const UsersView = () => {
	const { data } = useUser();

	return (
		<div className="container mx-auto pb-10 pt-5">
			<Heading title={`Lista de usuarios (${data.length})`} />
			<DataTableUsers columns={columnsUser} data={data.toReversed()} />
		</div>
	);
};
