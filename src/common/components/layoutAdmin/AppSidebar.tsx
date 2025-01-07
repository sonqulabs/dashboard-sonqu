import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@shadcnui/dropdown-menu';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarRail,
	SidebarTrigger,
} from '@shadcnui/sidebar';
import {
	ChevronsUpDown,
	GalleryVerticalEnd,
	Grid,
	LogOut,
	Settings,
} from 'lucide-react';
import Link from 'next/link';
import { auth } from 'raiz/auth';
import * as React from 'react';
import { LogoutButton } from '../customize/Logout';
import { Avatar, AvatarFallback, AvatarImage } from '../shadcnui/avatar';
import { Nav } from './Nav';

export const company = {
	name: 'SONQU',
	logo: GalleryVerticalEnd,
	plan: 'Sistema de Gestión',
};

export default async function AppSidebar({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	if (!session)
		return (
			<div className="h-screen w-full flex flex-col gap-2 items-center justify-center">
				<h1 className="text-lg ">¡No estas autenticado!, debes de </h1>
				<Link
					href="/"
					className="bg-gray-800 rounded-xl text-sm px-4 py-2 text-white"
				>
					Iniciar Sesión
				</Link>
			</div>
		);

	return (
		<SidebarProvider>
			<Sidebar collapsible="icon">
				<SidebarHeader>
					<div className="flex gap-2 py-2">
						<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gray-800 text-white">
							<Grid className="size-5" />
						</div>
						<div className="grid flex-1 text-left">
							<span className="truncate font-semibold text-gray-900 text-sm leading-tight  tracking-tight">
								{company.name}
							</span>
							<span className="truncate text-xs leading-none text-gray-700">
								{company.plan}
							</span>
						</div>
					</div>
				</SidebarHeader>
				<hr className="bg-gray-300" />
				<SidebarContent className="overflow-x-hidden">
					<SidebarGroup>
						<SidebarGroupLabel>Panel</SidebarGroupLabel>
						<SidebarMenu>
							<Nav />
						</SidebarMenu>
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter>
					<SidebarMenu>
						<SidebarMenuItem>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<SidebarMenuButton
										size="lg"
										className="data-[state=open]:bg-gray-800 data-[state=open]:text-gray-50 bg-gray-800 hover:bg-gray-800 rounded-xl hover:text-gray-50 text-gray-50"
									>
										<Avatar className="flex aspect-square size-8 items-center justify-center">
											<AvatarImage
												src={session?.user?.image || ''}
												alt={session?.user?.username || ''}
											/>
											<AvatarFallback className="text-gray-700 ">
												{session?.user?.username?.slice(0, 2)?.toUpperCase() ||
													'CN'}
											</AvatarFallback>
										</Avatar>
										<div className="grid flex-1 text-left text-sm leading-tight">
											<span className="truncate font-semibold">
												{session.user?.username}
											</span>
											<span className="truncate text-xs">
												{/* {session.user?.username} */}Administrador
											</span>
										</div>
										<ChevronsUpDown className="ml-auto size-4" />
									</SidebarMenuButton>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
									side="bottom"
									align="end"
									sideOffset={4}
								>
									<DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
									<DropdownMenuSeparator />

									<DropdownMenuGroup>
										<Link href="/configuracion/grupoReceta">
											<DropdownMenuItem>
												<Settings />
												Configuración
											</DropdownMenuItem>
										</Link>
									</DropdownMenuGroup>
								</DropdownMenuContent>
							</DropdownMenu>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<LogoutButton className="rounded-xl mb-1 flex items-center justify-center w-full hover:bg-red-100 text-sm bg-red-200 text-red-800">
								<span className="flex aspect-square size-8 items-center justify-center">
									{' '}
									<LogOut className="size-4 " />
								</span>
								<h1 className="grid  text-left text-sm leading-tight">
									<span className="truncate">Cerrar Sesión</span>
								</h1>
							</LogoutButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
				<SidebarRail />
			</Sidebar>
			<SidebarInset>
				<header className="flex h-12 shrink-0 items-center bg-white z-40  justify-between gap-2 transition-[width,height] sticky top-0 ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 ">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
					</div>

					{/* <div className="flex items-center gap-2 px-4">
						
					</div> */}
				</header>
				{/* <hr className="bg-gray-300" /> */}
				<main className="px-4 flex-1">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
