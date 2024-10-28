'use client';

import { User } from '@/common/interfaces';
import { columns } from './columns';
import { DataTable } from '@/modules/users/components/tables/data-table';

export default function EmployeeTable({
	data,
	totalData,
}: {
	data: User[];
	totalData: number;
}) {
	return (
		<div>
			<DataTable columns={columns} data={data} totalItems={totalData} />
		</div>
	);
}
