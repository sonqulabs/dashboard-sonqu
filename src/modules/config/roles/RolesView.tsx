'use client';
import { columnsRoles } from 'raiz/src/app/(dashboard)/configuracion/roles/columns';
import { DataTableRoles } from 'raiz/src/app/(dashboard)/configuracion/roles/data-table';
import { useRole } from 'raiz/src/hooks/useRoles';

export const RolesView = () => {
	const { data } = useRole();
	return <DataTableRoles columns={columnsRoles} data={data.toReversed()} />;
};
