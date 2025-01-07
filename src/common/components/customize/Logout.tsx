'use client';

import { cn } from 'raiz/src/lib/utils';
import { logout } from 'raiz/src/modules/login/actions/logout';

interface LogoutButtonProps {
	children?: React.ReactNode;
	className?: string;
}

export const LogoutButton = ({ children, className }: LogoutButtonProps) => {
	const onClick = () => {
		logout();
	};

	return (
		<button onClick={onClick} className={cn(className)}>
			{children}
		</button>
	);
};
