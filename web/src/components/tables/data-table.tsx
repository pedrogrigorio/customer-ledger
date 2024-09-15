'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcnui/table'
import { Input } from '../shadcnui/input'
import React from 'react'
import { Button } from '../shadcnui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from '../shadcnui/pagination'
import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )

  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Buscar por nome..."
          value={
            (table.getColumn('customer')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('customer')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-table-header">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-primary font-medium"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
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
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={
                        index === 0 ? 'text-primary' : 'text-secondary'
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-2 flex-1 text-sm text-secondary text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} de{' '}
        {table.getFilteredRowModel().rows.length} linhas selecionadas.
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="flex gap-2 px-4"
            >
              <CaretLeft weight="bold" />
              Anterior
            </Button>
          </PaginationItem>

          <>
            {table.getPageCount() <= 7 ? (
              Array.from({ length: table.getPageCount() }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={index === table.getState().pagination.pageIndex}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => table.setPageIndex(index)}
                    >
                      {index + 1}
                    </Button>
                  </PaginationLink>
                </PaginationItem>
              ))
            ) : table.getState().pagination.pageIndex < 4 ? (
              <>
                {Array.from({ length: 5 }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={index === table.getState().pagination.pageIndex}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => table.setPageIndex(index)}
                      >
                        {index + 1}
                      </Button>
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => table.lastPage()}
                    >
                      {table.getPageCount()}
                    </Button>
                  </PaginationLink>
                </PaginationItem>
              </>
            ) : table.getState().pagination.pageIndex >
              table.getPageCount() - 5 ? (
              <>
                <PaginationItem>
                  <PaginationLink>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => table.firstPage()}
                    >
                      1
                    </Button>
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                {Array.from({ length: table.getPageCount() })
                  .slice(-5)
                  .map((_, index) => {
                    const pageIndex = table.getPageCount() - 5 + index
                    return (
                      <PaginationItem key={pageIndex}>
                        <PaginationLink
                          isActive={
                            pageIndex === table.getState().pagination.pageIndex
                          }
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => table.setPageIndex(pageIndex)}
                          >
                            {pageIndex + 1}
                          </Button>
                        </PaginationLink>
                      </PaginationItem>
                    )
                  })}
              </>
            ) : (
              <>
                <PaginationItem>
                  <PaginationLink
                    isActive={table.getState().pagination.pageIndex === 0}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => table.firstPage()}
                    >
                      1
                    </Button>
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => table.previousPage()}
                    >
                      {table.getState().pagination.pageIndex}
                    </Button>
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => table.firstPage()}
                    >
                      {table.getState().pagination.pageIndex + 1}
                    </Button>
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => table.nextPage()}
                    >
                      {table.getState().pagination.pageIndex + 2}
                    </Button>
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    isActive={
                      table.getState().pagination.pageIndex ===
                      table.getPageCount() - 1
                    }
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => table.lastPage()}
                    >
                      {table.getPageCount()}
                    </Button>
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
          </>

          {/* <PaginationItem>
            <PaginationLink>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => table.setPageIndex(0)}
              >
                1
              </Button>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => table.setPageIndex(1)}
              >
                2
              </Button>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => table.setPageIndex(2)}
              >
                3
              </Button>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              isActive={
                table.getState().pagination.pageIndex ===
                table.getPageCount() - 1
              }
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => table.lastPage()}
              >
                {table.getPageCount()}
              </Button>
            </PaginationLink>
          </PaginationItem> */}
          <PaginationItem>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="flex gap-2 px-4"
            >
              Próximo
              <CaretRight weight="bold" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div> */}
    </div>
  )
}
