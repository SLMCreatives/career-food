"use client";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { Inbox, Radar, X } from "lucide-react";
import { RadarChart, PolarAngleAxis, PolarGrid } from "recharts";
import Link from "next/link";

type Lead = { [key: string]: any };

interface LeadDrawerProps {
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
}

const chartConfig = {
  workEnvironment: {
    label: "Work Environment",
    color: "#3b82f6"
  },
  dreamJob: {
    label: "Dream Job",
    color: "#f97316"
  },
  strength: {
    label: "Strength",
    color: "#10b981"
  },
  industry: {
    label: "Industry",
    color: "#8b5cf6"
  }
};

export function LeadDrawer({ lead, open, onClose }: LeadDrawerProps) {
  if (!lead) return null;
  const combinedMBTI = [lead.q_one, lead.q_two, lead.q_three, lead.q_four]
    .join("")
    .replace(/[-,+]/g, "");

  const formattedLead = {
    user_name: lead.user_name || "Anonymous",
    email: lead.email || "No email provided",
    mbti: combinedMBTI || "Not specified",
    work_environment: lead.q_five || "Not specified",
    dream_job: lead.q_six || "Not specified",
    strength: lead.q_seven || "Not specified",
    industry: lead.q_eight || "Not specified",
    icon: lead.icon || "default-icon.png",
    created_at: new Date(lead.created_at).toLocaleString() || "No date provided"
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="bg-stone-50 max-w-2xl mx-auto ">
        <DrawerHeader className="flex flex-col items-center gap-1">
          <DrawerTitle>Details</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 space-y-2 px-10">
          {Object.entries(formattedLead).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="font-medium text-muted-foreground capitalize">
                {key.replace(/_/g, " ")}:
              </span>
              <span
                className={`font-semibold text-gray-900 ${key !== "email" && "capitalize"}`}
              >
                {key === "email" ? (
                  <Link href={`mailto:${value}`}>{value}</Link>
                ) : (
                  value
                )}
              </span>
            </div>
          ))}
        </div>
        <DrawerFooter className="flex flex-col w-full gap-2 justify-center">
          <Button variant="default" onClick={onClose}>
            <Inbox className="mr-2" />
            <Link href={`mailto:${formattedLead.email}`}>Email</Link>
          </Button>
          <Button variant="link" onClick={onClose}>
            <X className="mr-2" />
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
