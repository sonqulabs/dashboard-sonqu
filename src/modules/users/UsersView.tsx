import { Heading } from '@/common/components/customize/Heading';
import EmployeeTable from './components/tables/table';
import { users } from './data/user';
import Link from 'next/link';
import { Separator } from 'raiz/src/common/components/shadcnui/separator';
import { auth } from 'raiz/auth';

export const UsersView = async () => {
	const employees = users;
	const session = await auth();
	const res = await fetch(`${process.env.API_LOCALHOST}/users`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${session?.user.token}`,
		},
	});
	const data = await res.json();
	return (
		<div className="w-full">
			<div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-2  sm:items-center justify-between">
				<Heading
					title={`Lista de Usuarios (${employees.length})`}
					description="Administración de Perfiles"
				/>
				<Link
					href="/usuarios/nuevo"
					className="bg-gray-900 px-4 py-2 rounded-md text-white text-sm"
				>
					+ Agregar
				</Link>
			</div>
			<Separator className="my-3" />

			<EmployeeTable data={data} totalData={employees.length} />
		</div>
	);
};
