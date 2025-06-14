import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

type LeadStat = {
  name: string;
  stat: string | number;
  change: string;
  changeType: "positive" | "negative";
};

export function LeadStats({
  leads,
  leadscount,
  uniqueLeadsCount,
  uniqueLeadsPercentage,
  leadsByDate,
  uniqueEmailsCount,
  uniqueEmailsPercentage
}: {
  leads: any[];
  leadscount: number;
  uniqueLeadsCount: number;
  uniqueLeadsPercentage: string;
  leadsByDate: Record<string, number>;
  uniqueEmailsCount: number;
  uniqueEmailsPercentage: string;
}) {
  const totalLeads = leads.length || leadscount;

  const data: LeadStat[] = [
    {
      name: "Total Leads",
      stat: `${totalLeads}`,
      change: "+100%",
      changeType: "positive"
    },
    {
      name: "Unique Leads",
      stat: `${uniqueLeadsCount} `,
      change: `${uniqueLeadsPercentage}%`,
      changeType: "negative"
    },
    {
      name: "Unique Emails",
      stat: `${uniqueEmailsCount} `,
      change: `${uniqueEmailsPercentage}%`,
      changeType: "negative"
    }
  ];
  return (
    <dl className="grid grid-cols-2 gap-2 lg:gap-6 sm:grid-cols-1 lg:grid-cols-3 w-full">
      {data.map((item) => (
        <Card
          key={item.name}
          className="p-6 py-4 bg-stone-50 first:col-span-2 lg:first:col-span-1"
        >
          <CardContent className="p-0">
            <dt className="text-sm font-medium text-muted-foreground">
              {item.name}
            </dt>
            <dd className="mt-2 flex items-baseline space-x-2.5">
              <span className="text-5xl font-semibold text-foreground">
                {item.stat}
              </span>
              <span
                className={cn(
                  item.changeType === "positive"
                    ? "text-green-800 dark:text-green-400"
                    : "text-red-800 dark:text-red-400",
                  "text-sm font-medium"
                )}
              >
                {item.change}
              </span>
            </dd>
          </CardContent>
        </Card>
      ))}
    </dl>
  );
}
