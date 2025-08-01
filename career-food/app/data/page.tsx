/* eslint-disable react/jsx-no-undef */
"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Heading } from "@/components/ui/heading";
import { LeadsChart } from "@/components/chatbot/leads/LeadChart";
import { LeadTable } from "@/components/chatbot/leads/LeadTable";
import { LeadDrawer } from "@/components/chatbot/leads/LeadDrawer";
import { Separator } from "@/components/ui/separator";
import { LeadStats } from "@/components/chatbot/leads/LeadStats";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const revalidate = 30;

const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);
type Lead = any; // Consider defining a more specific type for Lead if possible

export default function DataDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const channels = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "usdupe" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setLeads((prevData) => [...prevData, payload.new]);
          } else if (payload.eventType === "UPDATE") {
            setLeads((prevData) =>
              prevData.map((item) =>
                item.id === payload.old.id ? payload.new : item
              )
            );
          } else if (payload.eventType === "DELETE") {
            setLeads((prevData) =>
              prevData.filter((item) => item.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchLeads = async () => {
      const { data, error } = await supabase
        .from("usdupe")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching leads:", error);
      } else if (data) {
        setLeads(data);
      }
    };

    fetchLeads();
  }, []);

  const handleSelect = (lead: Lead) => {
    setSelected(lead);
    setDrawerOpen(true);
  };

  const leadscount = leads.length;
  const uniqueLeads = Array.from(
    new Set(leads.map((lead) => lead.user_name))
  ).map((name) => leads.find((lead) => lead.user_name === name));
  const uniqueLeadsCount = uniqueLeads.length;
  const uniqueLeadsPercentage = ((uniqueLeadsCount / leadscount) * 100).toFixed(
    2
  );
  const leadsByDate = leads.reduce(
    (acc, lead) => {
      const date = new Date(lead.created_at).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const uniqueEmails = Array.from(new Set(leads.map((lead) => lead.email))).map(
    (email) => leads.find((lead) => lead.email === email)
  );
  const uniqueEmailsCount = uniqueEmails.length;
  const uniqueEmailsPercentage = (
    (uniqueEmailsCount / leadscount) *
    100
  ).toFixed(2);

  return (
    <main className="p-4 lg:p-8 space-y-6 absolute inset-0 overflow-y-auto bg-white">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 bg-white">
            <div className="flex flex-row gap-4 items-center">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Leads from Quiz Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      Sejarah Seminar (14 June 2025)
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex flex-row gap-4">
              <Button asChild>
                <Link href="/data/upload">Upload</Link>
              </Button>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 bg-white">
            <div className="flex flex-col gap-4">
              <Heading className="text-2xl font-semibold -py-2" id="overview">
                Overview
              </Heading>
              <p className="text-muted-foreground">
                Seminar leads collected from the quiz responses.
              </p>
              <LeadStats
                leads={leads}
                leadscount={leadscount}
                uniqueLeadsCount={uniqueLeadsCount}
                uniqueLeadsPercentage={uniqueLeadsPercentage}
                leadsByDate={leadsByDate}
                uniqueEmailsCount={uniqueEmailsCount}
                uniqueEmailsPercentage={uniqueEmailsPercentage}
              />
              <Separator />
              <Heading className="text-2xl font-semibold" id="segmentation">
                Segmentation
              </Heading>
              <p className="text-muted-foreground">
                Analyze leads based on their responses to the quiz questions.
              </p>
              <LeadsChart data={leads} />
              <Separator />
              <Heading className="text-2xl font-semibold" id="raw">
                Leads Table
              </Heading>
              <p className="text-muted-foreground">
                View and manage leads collected from the quiz.
              </p>
              <LeadTable data={leads} onSelect={handleSelect} />
              <LeadDrawer
                lead={selected}
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              />
            </div>
            {/* <div className="bg-muted/50 aspect-video rounded-xl" />
              <div className="bg-muted/50 aspect-video rounded-xl" />
              <div className="bg-muted/50 aspect-video rounded-xl" /> */}
            {/*  <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
