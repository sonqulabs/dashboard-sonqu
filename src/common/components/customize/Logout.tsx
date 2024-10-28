'use client';

import { logout } from 'raiz/src/modules/login/actions/logout';

interface LogoutButtonProps {
	children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
	const onClick = () => {
		logout();
	};

	return (
		<button
			onClick={onClick}
			className=" flex w-full items-center gap-2 justify-start bg-transparent  text-gray-900 hover:bg-transparent "
		>
			{children}
		</button>
	);
};
