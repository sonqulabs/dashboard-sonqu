'use client';

import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@shadcnui/table';
import { DataTablePagination } from 'raiz/src/common/components/customize/Pagination';
import { Input } from 'raiz/src/common/components/shadcnui/input';
import React from 'react';
import Link from 'next/link';
import { useDeleteIdsUser } from 'raiz/src/hooks/useUsers';

interface DataTableProps<TData extends { id: number | string }, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}
export function DataTableUsers<TData extends { id: number | string }, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnFilters,
		},
	});

	const { mutation } = useDeleteIdsUser();
	const handleDeleteSelectedRows = async () => {
		const selectedRowIds = table
			.getSelectedRowModel()
			.rows.map((row) => row.original.id);

		await mutation.mutateAsync(selectedRowIds as string[]);
		console.log(selectedRowIds);
	};
	const hasSelectedRows = table.getSelectedRowModel().rows.length > 0;

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<Input
					placeholder="Filtral Categorias..."
					value={
						(table.getColumn('username')?.getFilterValue() as string) ?? ''
					}
					onChange={(event) =>
						table.getColumn('username')?.setFilterValue(event.target.value)
					}
					className="max-w-sm rounded-xl"
				/>
				<div className="flex items-center gap-2">
					{hasSelectedRows && (
						<button
							onClick={handleDeleteSelectedRows}
							className="bg-red-500 rounded-xl px-4 py-2 text-white text-sm flex items-center gap-1"
						>
							Eliminar <span>({table.getSelectedRowModel().rows.length})</span>
						</button>
					)}
					<Link
						href="/usuarios/nuevo"
						className="flex items-center gap-2 bg-gray-800 text-white rounded-xl px-4 py-2 text-sm"
					>
						+ Agregar
					</Link>
				</div>
			</div>
			<div className="rounded-xl border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id} className="p-2">
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className="p-2">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<DataTablePagination table={table} />
		</div>
	);
}
