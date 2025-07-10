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
    <main className="space-y-6 absolute inset-0 overflow-y-auto bg-gradient-to-b from-[#0f1c3a]  via-[#1c3367] to-[#0f1c3a]">
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
      <div className="flex max-w-lg items-start justify-center mx-auto ">
        <div className="w-full overflow-hidden">
          <div className="items-center justify-center px-4 flex">
            <Image
              src="/UIU_logo.png"
              alt="UNITAR"
              width={200}
              height={200}
              className="w-6 h-6 mr-4"
            />
            <h1 className="text-2xl tracking-wider font-serif text-gray-900 dark:text-white ">
              UNITAR
            </h1>
          </div>
          <div className="w-full py-4 px-4 flex flex-col items-center justify-center text-white text-center gap-2">
            <Image
              src="/hero-title.png"
              alt="SGS Leaderboard"
              width={300}
              height={100}
              className="w-full object-contain"
            />
            {/* <p className="text-4xl font-bold">SGS Leaderboard</p>
            <p className="text-sm">Bring a Buddy, Clain Your Bounty</p> */}
          </div>

          <div className="relative flex flex-col items-center justify-center space-y-4">
            <div className="grid grid-cols-3  w-full items-end justify-around">
              {/* Second Place */}
              <div className="relative flex flex-col items-center">
                <div className="h-24 w-24 border-2  rounded-xl bg-transparent border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] flex items-center justify-center -skew-x-12 translate-x-2">
                  <Image
                    src="/ranks/Legendary.svg"
                    alt={topThree[1]?.nickname}
                    width={80}
                    height={80}
                    className="rounded-xl object-cover object-center p-2 skew-x-12"
                  />
                </div>
                <span className="-mt-2 text-md tracking-tight px-3 rounded-sm text-blue-900 bg-blue-100 uppercase font-bold z-20">
                  {topThree[1]?.nickname}
                </span>
                <span className="mt-2 text-sm text-gray-500 dark:text-gray-300 italic">
                  Legendary
                </span>
                <span className="text-lg text-gray-500 dark:text-gray-200">
                  RM {topThree[1]?.total_bounty}
                </span>
              </div>

              {/* First Place */}
              <div className="relative flex flex-col items-center">
                <div className="h-[6.5rem] w-[6.5rem] border-2 rounded-xl bg-transparent border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] flex items-center justify-center -skew-x-12 translate-x-2">
                  <Image
                    src="/ranks/Mythic.svg"
                    alt={topThree[1]?.nickname}
                    width={100}
                    height={100}
                    className="rounded-xl object-cover object-center p-2 skew-x-12"
                  />
                </div>
                <span className="-mt-2 text-xl tracking-tight px-3 rounded-sm text-blue-900 bg-blue-100 uppercase font-bold z-20">
                  {topThree[0]?.nickname}
                </span>
                <span className="mt-2 text-md text-gray-500 dark:text-gray-300 italic">
                  Mythic
                </span>
                <span className="text-2xl text-gray-500 dark:text-yellow-400 animate-pulse animate-2s_ease-in-out_infinite">
                  RM {topThree[0]?.total_bounty}
                </span>
              </div>

              {/* Third Place */}
              <div className="relative flex flex-col items-center">
                <div className="h-[6rem] w-[6rem] border-2 rounded-xl bg-transparent border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] flex items-center justify-center -skew-x-12 translate-x-2">
                  <Image
                    src="/ranks/Elite.svg"
                    alt={topThree[1]?.nickname}
                    width={80}
                    height={80}
                    className="rounded-xl object-cover object-center p-2 skew-x-12"
                  />
                </div>
                <span className="-mt-2 text-md tracking-tight px-3 rounded-sm text-blue-900 bg-blue-100 uppercase font-bold z-20">
                  {topThree[2]?.nickname}
                </span>
                <span className="mt-2 text-sm text-gray-500 dark:text-gray-300 italic">
                  Elite
                  {/* {topThree[2]?.title} */}
                </span>
                <span className="text-lg text-gray-500 dark:text-gray-200">
                  RM {topThree[2]?.total_bounty}
                </span>
              </div>
            </div>
          </div>

          <ScrollArea className="min-h-[300px] px-4 py-2">
            <div className="flex flex-row items-center justify-between px-4 pb-2 text-xs italic text-gray-300">
              <p>No.</p>
              <p className="-ml-28">Nickname</p>
              <p>Bounty*</p>
            </div>
            <div className="space-y-5">
              {restOfLeaderboard.map((entry, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between rounded-xl p-3 py-1 border border-blue-100/50 ${
                    index % 2 === 0
                      ? "bg-slate-200 dark:bg-transparent"
                      : "bg-white dark:bg-transparent"
                  }`}
                >
                  <div className="flex items-center space-x-3 relative">
                    <span
                      className={`w-6 text-center text-sm font-thin $"text-gray-500 dark:text-gray-300"
                      `}
                    >
                      {index + 4}
                    </span>
                    <div className="h-14 w-14 border bg-blue-950  rounded-xl absolute left-7 flex items-center justify-center -skew-x-12 border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f]">
                      <Image
                        src={`/ranks/${entry.title}.svg`}
                        alt={entry.nickname}
                        width={100}
                        height={100}
                        className="rounded-xl object-cover object-center p-1 skew-x-12"
                      />
                    </div>
                    <div className="flex flex-col gap-0 pl-20">
                      <span
                        className={`text-sm tracking-tight rounded-sm text-blue-100 uppercase font-bold`}
                      >
                        {" "}
                        {entry.nickname}
                      </span>
                      <span
                        className={`-mt-1 text-xs text-gray-500 dark:text-gray-300 italic`}
                      >
                        {entry.title}
                      </span>
                    </div>
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
        </div>
      </div>
      <div className="flex flex-row max-w-lg items-start justify-center text-balance mx-auto px-2">
        <p className="text-[10px] italic text-gray-500 dark:text-gray-300">
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
      <div className="flex flex-row items-center justify-between space-x-2 max-w-lg mx-auto px-2">
        <Link
          href="https://www.unitar.my"
          className="text-sm text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
        >
          unitar.my
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          #ACCELERATEYourFuture
        </p>
      </div>
    </main>
  );
}
