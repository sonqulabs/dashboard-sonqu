import { cn } from 'raiz/src/lib/utils';

interface HeadingProps {
	title: string;
	description?: string;
	className?: string;
	classNameContainer?: string;
}

export const Heading: React.FC<HeadingProps> = ({
	title,
	description,
	className,
	classNameContainer,
}) => {
	return (
		<div className={cn(classNameContainer, 'mb-4')}>
			<h2 className={cn(className, 'text-3xl font-bold tracking-tight')}>
				{title}
			</h2>
			{description && (
				<p className="text-sm text-muted-foreground">{description}</p>
			)}
		</div>
	);
};
