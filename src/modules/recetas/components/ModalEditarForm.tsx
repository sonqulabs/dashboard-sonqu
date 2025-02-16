import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@shadcnui/dialog';
import { Button } from 'raiz/src/common/components/shadcnui/button';
import EditRecipesForm from './EditRecipesForm';
import { useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Recipes } from 'raiz/src/common/interfaces/recetas';

interface ModalEditorFormProps {
	open: boolean;
	data: Recipes;
	setOpen: (open: boolean) => void;
}

export const ModalEditorForm: React.FC<ModalEditorFormProps> = ({
	open,
	data,
	setOpen,
}) => {
	const formRef = useRef<HTMLFormElement | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSave = () => {
		if (formRef.current) {
			formRef.current.requestSubmit(); // Envía el formulario de manera programática
		}
	};
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-[80vw] h-[80vh]">
				<DialogHeader>
					<DialogTitle className="text-2xl">Editar Receta</DialogTitle>
					<DialogDescription>
						Haz los cambios que necesites en la receta y asegúrate de guardarlos
						antes de salir.
					</DialogDescription>
				</DialogHeader>
				<div className="overflow-y-auto px-4">
					<EditRecipesForm
						ref={formRef}
						setIsLoading={setIsLoading}
						dataReceta={data}
					/>
				</div>
				<DialogFooter>
					<Button
						onClick={handleSave}
						// onClick={() => setOpen(false)}
						className="w-[180px] "
						disabled={isLoading}
					>
						{isLoading ? (
							<span className="flex items-center justify-center gap-2 whitespace-nowrap">
								<Loader2 className="mr-2 h-5 w-5 animate-spin " />
								Guardando...
							</span>
						) : (
							<span className="whitespace-nowrap">Guardar cambios</span>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
