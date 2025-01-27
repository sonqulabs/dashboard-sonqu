import { NavItem } from '../interfaces';

export const navItems: NavItem[] = [
	{
		title: 'Dashboard',
		url: '/dashboard',
		icon: 'dashboard',
		isActive: false,
		items: [], // Empty array as there are no child items for Dashboard
	},
	{
		title: 'Usuarios',
		url: '/usuarios',
		icon: 'user',
		isActive: false,
		items: [], // No child items
	},

	{
		title: 'Recetas Sonqu',
		url: '#', // Placeholder as there is no direct link for the parent
		icon: 'web',
		isActive: true,

		items: [
			// {
			// 	title: 'Recetas Pendientes',
			// 	url: '/dashboard/profile',
			// 	icon: 'userPen',
			// },
			{
				title: 'Recetas totales',
				url: '/recetas/lista-recetas',
				icon: 'login',
			},
			{
				title: 'Categorias',
				url: '/recetas/categorias',
				icon: 'login',
			},
		],
	},
];
