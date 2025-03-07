import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMemo, useState } from "react";
import { UserProps } from "@/interfaces/authInterface";
import { Button } from "../ui/button";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { formatDate } from "@/lib/formatDate";
import { useQuery } from "@tanstack/react-query";
import { allUsers } from "@/apis/authApis";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";
import { Input } from "../ui/input";

const AllUsersTable = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: allUsers,
    staleTime: 0,
    refetchOnMount: true,
    // refetchOnWindowFocus: true,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const columns = useMemo<ColumnDef<UserProps>[]>(
    () => [
      {
        accessorKey: "full_name",
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="hover:bg-primary"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("full_name")}</div>,
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <div>{row.getValue("email")}</div>,
      },
      {
        accessorKey: "is_active",
        header: "Active",
        cell: ({ row }) => {
          return (
            <div className="flex items-center justify-start gap-3">
              {row.getValue("is_active") ? (
                <p className="text-green-600 w-fit h-fit font-bold">Active</p>
              ) : (
                <p className="text-yellow-600 w-fit h-fit font-bold">
                  Inactive
                </p>
              )}
              {/* <Switch
                id="active-mode"
                checked={row.getValue("active")}
                onCheckedChange={(value) =>
                  updateUserStatusHandler(value, row.getValue("id"))
                }
                disabled={updateUserLoading}
              /> */}
            </div>
          );
        },
      },
      {
        accessorKey: "is_superuser",
        header: "Admin",
        cell: ({ row }) => {
          return (
            <div className="flex items-center justify-start gap-3">
              {row.getValue("is_superuser") ? (
                <p className="text-green-600 w-fit h-fit font-bold">Yes</p>
              ) : (
                <p className="text-yellow-600 w-fit h-fit font-bold">No</p>
              )}
              {/* <Switch
                id="active-mode"
                checked={row.getValue("active")}
                onCheckedChange={(value) =>
                  updateUserStatusHandler(value, row.getValue("id"))
                }
                disabled={updateUserLoading}
              /> */}
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => (
          <div>{`${formatDate(row.original.created_at)}`}</div>
        ),
      },
    ],
    []
  );

  const tableData = useMemo(() => users?.results ?? [], [users?.results]);

  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return isLoading ? (
    <div className="flex items-center space-x-4 py-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ) : (
    <>
      <div className="flex items-center py-4">
        <Input
          placeholder="Find user by name"
          value={(table.getColumn("full_name")?.getFilterValue() as string) ?? ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            table.getColumn("full_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table className="bg-white shadow-lg rounded-lg">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-primary hover:bg-primary"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-white">
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
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  <div className="flex flex-col items-center justify-center gap-4">
                    No results.
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* {allUsers?.data.total && allUsers?.data.total > 0 ? (
          <CustomPagination totalPages={allUsers?.data.totalPages as number} />
        ) : null} */}
      </div>
    </>
  );
};

export default AllUsersTable;
