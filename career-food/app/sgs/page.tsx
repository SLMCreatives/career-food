/* eslint-disable react/jsx-no-undef */
"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Crown } from "lucide-react";
import { Card, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ThemeSwitcher } from "@/components/theme-switcher";

const revalidate = 30;

const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);
type Lead = any; // Consider defining a more specific type for Lead if possible

type sgsLeaders = any;

export default function DataDashboard() {
  const [leads, setLeads] = useState<sgsLeaders[]>([]);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const channels = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "sgsleads" },
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
        .from("sgsleads")
        .select("*")
        .order("bounty", { ascending: false });

      if (error) {
        console.error("Error fetching leads:", error);
      } else if (data) {
        setLeads(data);
      }
    };

    fetchLeads();
  }, []);

  const leaderboardData = leads.map((lead) => ({
    nickname: lead.nickname,
    referrals: lead.referrals,
    bounty: lead.bounty,
    title: lead.title
  }));

  const topThree = leaderboardData.slice(0, 3);
  const restOfLeaderboard = leaderboardData.slice(3, 9);

  return (
    <main className="p-4 lg:p-8 space-y-6 absolute inset-0 overflow-y-auto bg-white dark:bg-slate-900">
      <div className="flex gap-4 justify-end w-full fixed bottom-4 right-4">
        <Button variant={"default"} size={"icon"} asChild>
          <Link href="/sgs/upload">+</Link>
        </Button>
        <ThemeSwitcher />
      </div>
      <div className="flex max-w-lg items-start justify-center mx-auto">
        <Card className="w-full overflow-hidden rounded-3xl bg-white shadow-lg dark:bg-slate-800">
          <div className="flex items-center justify-center p-4">
            {/*  <Link
              href="/sgs"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ArrowLeft className="h-6 w-6" />
              <span className="sr-only">Back</span>
            </Link> */}
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              SGS Leaderboard
            </h1>
            <div className="w-6" /> {/* Placeholder for alignment */}
          </div>

          <div className="relative flex flex-col items-center justify-center space-y-4 bg-gradient-to-b from-[#F0F2F5] to-white p-6 dark:from-gray-700 dark:to-gray-800">
            <div className="flex w-full items-end justify-around">
              {/* Second Place */}
              <div className="relative flex flex-col items-center">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#C0C0C0] px-2 py-0.5 text-xs font-bold text-white shadow-md">
                  2
                </div>
                <Avatar className="h-20 w-20 border-2 border-[#C0C0C0] shadow-md rounded-full">
                  <AvatarImage
                    src={"/placeholder.jpg"}
                    alt={topThree[1]?.nickname}
                    className="rounded-full object-cover object-center"
                  />
                  <AvatarFallback>
                    {topThree[1]?.nickname.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-50">
                  {topThree[1]?.nickname}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {topThree[1]?.title}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-200">
                  RM {topThree[1]?.bounty}
                </span>
              </div>

              {/* First Place */}
              <div className="relative flex flex-col items-center">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-[#FFD700] px-2 py-0.5 text-xs font-bold text-white dark:text-black shadow-md ">
                  <Crown className="h-6 w-6" />
                </div>
                <Avatar className="h-24 w-24 border-2 border-[#FFD700] shadow-2xl rounded-full">
                  <AvatarImage
                    src={"/placeholder.jpg"}
                    alt={topThree[0]?.nickname}
                    className="rounded-full object-cover object-center"
                  />
                  <AvatarFallback>
                    {topThree[0]?.nickname.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="mt-2 text-xl font-semibold text-gray-900 dark:text-yellow-400">
                  {topThree[0]?.nickname}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {topThree[0]?.title}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-200">
                  RM {topThree[0]?.bounty}
                </span>
              </div>

              {/* Third Place */}
              <div className="relative flex flex-col items-center">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#CD7F32] px-2 py-0.5 text-xs font-bold text-white shadow-md">
                  3
                </div>
                <Avatar className="h-20 w-20 border-2 border-[#CD7F32] shadow-md rounded-full">
                  <AvatarImage
                    src={"/placeholder.jpg"}
                    alt={topThree[2]?.nickname}
                    className="rounded-full object-cover object-center"
                  />
                  <AvatarFallback>
                    {topThree[2]?.nickname.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-50">
                  {topThree[2]?.nickname}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {topThree[2]?.title}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-200">
                  RM {topThree[2]?.bounty}
                </span>
              </div>
            </div>
          </div>

          <ScrollArea className="min-h-[300px] p-4">
            <div className="space-y-2">
              {restOfLeaderboard.map((entry, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between rounded-xl p-3 ${
                    index % 2 === 0
                      ? "bg-slate-200 dark:bg-slate-800"
                      : "bg-white dark:bg-slate-700"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`w-6 text-center text-sm font-medium $"text-gray-500 dark:text-gray-400"
                      `}
                    >
                      {index + 4}
                    </span>
                    <Avatar className="h-9 w-9 rounded-full">
                      <AvatarImage
                        src={"/placeholder.jpg"}
                        alt={entry.nickname}
                        className="rounded-full object-cover object-center"
                      />
                      <AvatarFallback>
                        {entry.nickname.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span
                      className={`text-sm font-medium text-gray-900 dark:text-gray-50`}
                    >
                      {entry.nickname}
                    </span>
                    <span
                      className={`text-xs text-gray-500 dark:text-gray-400`}
                    >
                      {entry.title}
                    </span>
                  </div>
                  <span
                    className={`text-sm font-medium "text-gray-500 dark:text-gray-400
                    `}
                  >
                    RM {entry.bounty}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
          <CardFooter>
            <p className="text-xs italic text-gray-500 dark:text-gray-400">
              *Bounty shown are estimated count and does not reflect the actual
              incentive amount. Please refer to the{" "}
              <span className="underline text-blue-600">
                terms and conditions
              </span>{" "}
              for more details.
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
