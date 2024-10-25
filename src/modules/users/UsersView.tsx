import { Heading } from '@/common/components/customize/Heading';
import EmployeeTable from './components/tables/table';
import { users } from './data/user';
import Link from 'next/link';

export const UsersView = () => {
	const employees = users;

	return (
		<div>
			<div className="flex items-center justify-between">
				<Heading
					title="Lista de Usuarios"
					description="Administración de Perfiles"
				/>
				<Link
					href="/usuarios/nuevo"
					className="bg-gray-900 px-4 py-2 rounded-md text-white text-sm"
				>
					+ Agregar
				</Link>
			</div>
			<EmployeeTable data={employees} totalData={employees.length} />
		</div>
	);
};
