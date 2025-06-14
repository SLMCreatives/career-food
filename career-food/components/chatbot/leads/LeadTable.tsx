"use client";
import { Button } from "@/components/ui/button";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";

type Lead = {
  id: number;
  created_at: string;
  user_name: string;
  q_one: string;
  q_two: string;
  q_three: string;
  q_four: string;
  q_five: string;
  q_six: string;
  q_seven: string;
  q_eight: string;
  icon: string;
  email: string;
};

interface LeadTableProps {
  data: Lead[];
  onSelect: (lead: Lead) => void;
}

const combinedMBTI = (lead: Lead) =>
  [lead.q_one, lead.q_two, lead.q_three, lead.q_four]
    .join("")
    .replace(/[-,+]/g, "");

export function LeadTable({ data, onSelect }: LeadTableProps) {
  const columns: DataTableColumn<Lead>[] = [
    { header: "Name", accessorKey: "user_name" },
    /*     { header: "Email", accessorKey: "email" },
     */ {
      header: "MBTI",
      accessorKey: "q_one",
      cell: ({ row }) => combinedMBTI(row.original)
    },
    { header: "Work Environment", accessorKey: "q_five" },
    { header: "Dream Job", accessorKey: "q_six" },
    { header: "Strength", accessorKey: "q_seven" },
    { header: "Industry", accessorKey: "q_eight" },
    {
      header: "Action",
      cell: ({ row }) => (
        <Button
          variant={"default"}
          size="sm"
          onClick={() => onSelect(row.original)}
        >
          View
        </Button>
      )
    }
  ];

  return <DataTable columns={columns} data={data} />;
}
