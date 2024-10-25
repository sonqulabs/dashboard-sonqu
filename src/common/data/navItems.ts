import { NavItem } from '../interfaces';

export const navItems: NavItem[] = [
	{
		title: 'Dashboard',
		url: '/dashboard/overview',
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
		title: 'Account',
		url: '#', // Placeholder as there is no direct link for the parent
		icon: 'billing',
		isActive: true,

		items: [
			{
				title: 'Profile',
				url: '/dashboard/profile',
				icon: 'userPen',
			},
			{
				title: 'Login',
				url: '/',
				icon: 'login',
			},
		],
	},
];
