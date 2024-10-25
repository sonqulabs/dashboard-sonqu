import { Separator } from '../shadcnui/separator';

interface HeadingProps {
	title: string;
	description?: string;
}

export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
	return (
		<div>
			<h2 className="text-3xl font-bold tracking-tight">{title}</h2>
			{description && (
				<p className="text-sm text-muted-foreground">{description}</p>
			)}
			<Separator className="my-3" />
		</div>
	);
};
