import { Metadata } from 'next';
import { Separator } from 'raiz/src/common/components/shadcnui/separator';

import { SidebarNavConfig } from 'raiz/src/modules/config/components/sidebar-nav';

export const metadata: Metadata = {
	title: 'Forms',
	description: 'Advanced form example using react-hook-form and Zod.',
};

const sidebarNavItems = [
	{
		title: 'Grupos de Receta',
		href: '/configuracion/grupoReceta',
	},
];

interface SettingsLayoutProps {
	children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
	return (
		<div className=" space-y-6 p-10 pb-16 ">
			<div className="space-y-0.5">
				<h2 className="text-2xl font-bold ">Configuración</h2>
				<p className="text-muted-foreground">
					Administre y configure su aplicación.
				</p>
			</div>
			<Separator className="my-6" />
			<div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
				<aside className=" lg:w-1/5">
					<SidebarNavConfig items={sidebarNavItems} />
				</aside>
				<div className="flex-1 lg:max-w-2xl">{children}</div>
			</div>
		</div>
	);
}
