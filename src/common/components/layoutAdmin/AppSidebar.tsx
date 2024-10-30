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
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	CreditCard,
	GalleryVerticalEnd,
	LogOut,
} from 'lucide-react';
import * as React from 'react';
import { Nav } from './Nav';
import { LogoutButton } from '../customize/Logout';
import { auth } from 'raiz/auth';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../shadcnui/avatar';

export const company = {
	name: 'Administración',
	logo: GalleryVerticalEnd,
	plan: 'Sonqu ',
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
					<div className="flex gap-2 py-2 text-sidebar-accent-foreground ">
						<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
							<company.logo className="size-4" />
						</div>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold">{company.name}</span>
							<span className="truncate text-xs">{company.plan}</span>
						</div>
					</div>
				</SidebarHeader>
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
										className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
									>
										<Avatar className="h-8 w-8 rounded-lg">
											<AvatarImage
												src={session?.user?.image || ''}
												alt={session?.user?.username || ''}
											/>
											<AvatarFallback className="rounded-lg">
												{session?.user?.username?.slice(0, 2)?.toUpperCase() ||
													'CN'}
											</AvatarFallback>
										</Avatar>
										<div className="grid flex-1 text-left text-sm leading-tight">
											<span className="truncate font-semibold">
												{session.user?.username}
											</span>
											<span className="truncate text-xs">
												{session.user?.username}
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
									<DropdownMenuLabel className="p-0 font-normal">
										<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
											<Avatar className="h-8 w-8 rounded-lg">
												<AvatarImage
													src={session?.user?.image || ''}
													alt={session?.user?.name || ''}
												/>
												<AvatarFallback className="rounded-lg">
													{session?.user?.name?.slice(0, 2)?.toUpperCase() ||
														'CN'}
												</AvatarFallback>
											</Avatar>
											<div className="grid flex-1 text-left text-sm leading-tight">
												<span className="truncate font-semibold">
													{session.user?.name}
												</span>
												<span className="truncate text-xs">
													{' '}
													{session.user?.username}
												</span>
											</div>
										</div>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />

									<DropdownMenuGroup>
										<Link href="/configuracion/grupoReceta">
											<DropdownMenuItem>
												<BadgeCheck />
												Configuración
											</DropdownMenuItem>
										</Link>
										<DropdownMenuItem>
											<BadgeCheck />
											Account
										</DropdownMenuItem>
										<DropdownMenuItem>
											<CreditCard />
											Billing
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Bell />
											Notifications
										</DropdownMenuItem>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<LogoutButton>
											<LogOut />
											Cerrar Sesión
										</LogoutButton>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
				<SidebarRail />
			</Sidebar>
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 ">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
					</div>

					<div className="flex items-center gap-2 px-4">
						<h1>Usuario administrador</h1>
					</div>
				</header>
				<main className="p-6 flex-1">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
