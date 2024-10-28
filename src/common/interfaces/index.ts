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

export type User = {
	photo_url?: string;
	name: string;
	created_at?: string;
	id: number;
	updated_at?: string;
	role?: string;
	cel: string;
	password?: string;
	active: boolean;
	email: string;
	username?: string;
	roleId?: string;
};
