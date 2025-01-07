import { Icons } from '../components/icons/adminIcons';

export interface NavItem {
	title: string;
	url: string;
	disabled?: boolean;
	external?: boolean;
	icon?: keyof typeof Icons;
	label?: string;
	description?: string;
	isActive?: boolean;
	items?: NavItem[];
}
