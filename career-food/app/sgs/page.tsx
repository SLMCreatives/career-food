/* eslint-disable react/jsx-no-undef */
"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Award, Crown, Upload } from "lucide-react";
import { Card, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import UploadForm from "@/components/uploadform";

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
        .order("total_bounty", { ascending: false });

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
    name: lead.name,
    total_bounty: lead.total_bounty,
    online: lead.online,
    conventional: lead.conventional,
    bounty_o: lead.bounty_o,
    bounty_c: lead.bounty_c,
    title: lead.title
  }));
  const topThree = leaderboardData.slice(0, 3);
  const restOfLeaderboard = leaderboardData.slice(3, 9);

  return (
    <main className="p-4 lg:p-8 space-y-6 absolute inset-0 overflow-y-auto bg-white dark:bg-slate-900">
      <div className="flex gap-4 justify-end w-full fixed bottom-4 right-4">
        <ThemeSwitcher />
        <Dialog>
          <DialogTrigger className="pr-4 text-2xl text-muted-foreground hover:text-white">
            +
          </DialogTrigger>
          <DialogContent className="w-full">
            <DialogTitle className="sr-only">Update Data</DialogTitle>
            <UploadForm />
          </DialogContent>
        </Dialog>
        {/* <Button variant={"default"} size={"icon"} asChild>
          <Link href="/sgs/upload">+</Link>
        </Button> */}
      </div>
      <div className="flex max-w-lg items-start justify-center mx-auto">
        <Card className="w-full overflow-hidden rounded-3xl bg-white shadow-lg dark:bg-slate-800">
          <div className="flex items-center justify-center p-4">
            <Image
              src="/UIU_logo.png"
              alt="UNITAR"
              width={200}
              height={200}
              className="w-10 h-10 mr-4"
            />
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">
              SGS Leaderboard
            </h1>
            <div className="w-6" /> {/* Placeholder for alignment */}
          </div>

          <div className="relative flex flex-col items-center justify-center space-y-4 bg-gradient-to-b from-[#F0F2F5] to-white p-4 dark:from-gray-700 dark:to-gray-800">
            <div className="grid grid-cols-3  w-full items-end justify-around pt-4">
              {/* Second Place */}
              <div className="relative flex flex-col items-center">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-[#C0C0C0] px-2 py-0.5 text-md font-bold text-black shadow-md">
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
                <span className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-50">
                  {topThree[1]?.nickname}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 italic">
                  {topThree[1]?.title}
                </span>
                <span className="text-lg text-gray-500 dark:text-gray-200">
                  RM {topThree[1]?.total_bounty}
                </span>
              </div>

              {/* First Place */}
              <div className="relative flex flex-col items-center">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400 px-2 py-2 text-xs font-bold text-white dark:text-black shadow-md">
                  <Crown className="h-4 w-4" />
                </div>
                <Avatar className="h-24 w-24 border-2 border-yellow-400 shadow-2xl rounded-full">
                  <AvatarImage
                    src={"/placeholder.jpg"}
                    alt={topThree[0]?.nickname}
                    className="rounded-full object-cover object-center"
                  />
                  <AvatarFallback>
                    {topThree[0]?.nickname.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="mt-2 text-xl font-semibold text-gray-900 dark:text-yellow-400 flex flex-row gap-1 items-center">
                  <Award className="h-6 w-6 -ml-4" />
                  {topThree[0]?.nickname}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 italic">
                  {topThree[0]?.title}
                </span>
                <span className="text-2xl text-gray-500 dark:text-yellow-400 animate-pulse animate-2s_ease-in-out_infinite">
                  RM {topThree[0]?.total_bounty}
                </span>
              </div>

              {/* Third Place */}
              <div className="relative flex flex-col items-center">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-[#CD7F32] px-2 py-0.5 text-sm font-bold text-black shadow-md">
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
                <span className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-50">
                  {topThree[2]?.nickname}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 italic">
                  {topThree[2]?.title}
                </span>
                <span className="text-lg text-gray-500 dark:text-gray-200">
                  RM {topThree[2]?.total_bounty}
                </span>
              </div>
            </div>
          </div>

          <ScrollArea className="min-h-[300px] p-4">
            <div className="space-y-2">
              {restOfLeaderboard.map((entry, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between rounded-xl p-3 py-2 ${
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
                      className={`text-md font-medium text-gray-900 dark:text-gray-50`}
                    >
                      {" "}
                      {entry.nickname}
                    </span>
                    <span
                      className={`text-xs text-gray-500 dark:text-gray-400`}
                    >
                      {entry.title}
                    </span>
                  </div>
                  <span
                    className={`text-md font-thin "text-gray-500 dark:text-white
                    `}
                  >
                    RM {entry.total_bounty}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>
      <div className="flex flex-row max-w-lg items-start justify-center mx-auto px-6">
        <p className="text-xs italic text-gray-500 dark:text-gray-400">
          *Bounty shown are estimated count and does not reflect the actual
          incentive amount. Please refer to the{" "}
          <span className="underline text-blue-600 dark:text-blue-400">
            terms and conditions
          </span>{" "}
          for more details.
        </p>
        <Image
          src="/sample_qr.jpeg"
          alt="QR Code for Terms and Conditions"
          width={100}
          height={100}
          className="w-16 h-16"
        />
      </div>
    </main>
  );
}
