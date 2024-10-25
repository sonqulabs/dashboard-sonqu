'use client';
import { navItems } from '@/common/data/navItems';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@shadcnui/collapsible';
import {
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from '@shadcnui/sidebar';
import { Fragment } from 'react';
import { Icons } from '../icons/adminIcons';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Nav = () => {
	const pathname = usePathname();

	return (
		<Fragment>
			{navItems.map((item) => {
				const Icon = item.icon ? Icons[item.icon] : Icons.logo;
				return item?.items && item?.items?.length > 0 ? (
					<Collapsible
						key={item.title}
						asChild
						defaultOpen={item.isActive}
						className="group/collapsible"
					>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton
									tooltip={item.title}
									isActive={pathname === item.url}
								>
									{item.icon && <Icon />}
									<span>{item.title}</span>
									<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
								</SidebarMenuButton>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<SidebarMenuSub>
									{item.items?.map((subItem) => (
										<SidebarMenuSubItem key={subItem.title}>
											<SidebarMenuSubButton
												asChild
												isActive={pathname === subItem.url}
											>
												<Link href={subItem.url}>
													<span>{subItem.title}</span>
												</Link>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									))}
								</SidebarMenuSub>
							</CollapsibleContent>
						</SidebarMenuItem>
					</Collapsible>
				) : (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton
							asChild
							tooltip={item.title}
							isActive={pathname === item.url}
						>
							<Link href={item.url}>
								<Icon />
								<span>{item.title}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				);
			})}
		</Fragment>
	);
};
