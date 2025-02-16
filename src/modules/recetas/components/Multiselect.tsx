'use client';

import * as React from 'react';
import { X } from 'lucide-react';

import { Badge } from '@shadcnui/badge';
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
} from '@shadcnui/command';
import { Command as CommandPrimitive } from 'cmdk';

type Framework = Record<'value' | 'label', string>;

type MultiSelectProps = {
	options: Framework[];
	value: string[]; // Ahora acepta un array de strings
	onValueChange: (value: string[]) => void;
	placeholder?: string;
};

export function MultiSelect({
	options,
	value,
	onValueChange,
	placeholder = 'Seleccione una opción',
}: MultiSelectProps) {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [open, setOpen] = React.useState(false);
	const [inputValue, setInputValue] = React.useState('');

	const handleUnselect = React.useCallback(
		(valueToRemove: string) => {
			onValueChange(value.filter((val) => val !== valueToRemove));
		},
		[onValueChange, value]
	);

	const handleKeyDown = React.useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			const input = inputRef.current;
			if (input) {
				if (
					(e.key === 'Delete' || e.key === 'Backspace') &&
					input.value === ''
				) {
					onValueChange(value.slice(0, -1)); // Eliminar el último seleccionado
				}
				if (e.key === 'Escape') {
					input.blur();
				}
			}
		},
		[value, onValueChange]
	);

	const selectables = options.filter((option) => !value.includes(option.value));

	return (
		<Command
			onKeyDown={handleKeyDown}
			className="overflow-visible bg-transparent"
		>
			<div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background ">
				<div className="flex flex-wrap gap-1">
					{value.map((val) => {
						const option = options.find((opt) => opt.value === val);
						return (
							option && (
								<Badge key={val} variant="secondary">
									{option.label}
									<button
										className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
										onMouseDown={(e) => e.preventDefault()}
										onClick={() => handleUnselect(val)}
									>
										<X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
									</button>
								</Badge>
							)
						);
					})}
					<CommandPrimitive.Input
						ref={inputRef}
						value={inputValue}
						onValueChange={setInputValue}
						onBlur={() => setOpen(false)}
						onFocus={() => setOpen(true)}
						placeholder={placeholder}
						className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
					/>
				</div>
			</div>
			<div className="relative">
				{open && (
					<CommandList
						className="absolute top-2 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in"
						onMouseDown={(e) => e.preventDefault()}
					>
						{selectables.length > 0 && (
							<CommandGroup>
								{selectables.map((option) => (
									<CommandItem
										key={option.value}
										onMouseDown={(e) => e.preventDefault()}
										onSelect={() => {
											setInputValue('');
											onValueChange([...value, option.value]); // Añadir nuevo valor
										}}
										className="cursor-pointer"
									>
										{option.label}
									</CommandItem>
								))}
							</CommandGroup>
						)}
					</CommandList>
				)}
			</div>
		</Command>
	);
}
