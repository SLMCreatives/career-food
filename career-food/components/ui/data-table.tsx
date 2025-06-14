"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import type React from "react";
import { Button } from "./button";
import { useState } from "react";
import { Input } from "./input";
import { set } from "zod";

export type DataTableColumn<T> = {
  header: string;
  accessorKey?: keyof T;
  cell?: (props: { row: { original: T } }) => React.ReactNode;
};

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
}

export function DataTable<T>({ columns, data }: DataTableProps<T>) {
  const [limit, setLimit] = useState(10);
  const handleLoadMore = () => {
    setLimit((prev) => prev + 10);
  };
  const handleLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setLimit(value);
    }
  };

  if (data.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No data available
      </div>
    );
  }
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 ">
            {columns.map((column, index) => (
              <TableHead key={index} className="text-nowrap first:w-[100px]">
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.slice(0, limit).map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell
                  key={colIndex}
                  className={`${colIndex !== 1 ? "capitalize" : "text-xs"}`}
                >
                  {column.cell
                    ? column.cell({ row: { original: row } })
                    : column.accessorKey
                      ? String(row[column.accessorKey])
                      : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="p-4 flex justify-between gap-10">
        <Button variant="default" size="sm" onClick={() => handleLoadMore()}>
          Load More
        </Button>
        <p className="text-sm text-muted-foreground flex flex-row gap-2 items-center">
          Showing{" "}
          <Input
            value={limit}
            onChange={handleLimit}
            max={100}
            className="w-20 bg-white "
          />{" "}
          of {data.length} results
        </p>
      </div>
    </div>
  );
}
