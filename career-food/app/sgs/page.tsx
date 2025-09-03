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
import { title } from "process";

const revalidate = 30;

const dynamic = "force-dynamic";

const titles = [
  "Mythic",
  "Legendary",
  "Elite",
  "Diamond",
  "Platinum",
  "Gold",
  "Silver",
  "Bronze",
  "Scout",
  "Recruit"
];

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
    title: lead.title,
    campus: lead.campus
  }));
  const topThree = leaderboardData.slice(0, 3);
  const restOfLeaderboard = leaderboardData.slice(3, 10);

  console.log(
    restOfLeaderboard.map((entry) => ({
      nickname: entry.nickname
    }))
  );

  return (
    <main className="h-[3842px] w-[2162px] space-y-6 absolute inset-0 bg-gradient-to-b from-[#0f1c3a]  via-[#1c3367] to-[#0f1c3a] ring ring-white">
      <div className="flex gap-4 justify-end w-full fixed bottom-4 right-4 z-50">
        <ThemeSwitcher />
        <Link href="/sgs/upload" className="text-3xl">
          +
        </Link>
        {/* <Dialog>
          <DialogTrigger className="pr-4 text-2xl text-muted-foreground hover:text-white">
            +
          </DialogTrigger>
          <DialogContent className="w-full">
            <DialogTitle className="sr-only">Update Data</DialogTitle>
            <UploadForm />
          </DialogContent>
        </Dialog> */}
        {/* <Button variant={"default"} size={"icon"} asChild>
          <Link href="/sgs/upload">+</Link>
        </Button> */}
      </div>
      <div className="flex w-full items-start justify-center mx-auto">
        <div className="w-full overflow-hidden">
          <div className="items-center justify-between px-8 flex pt-14">
            <Image
              src="/UIU-white.png"
              alt="UNITAR"
              width={1000}
              height={1000}
              className="w-fit h-32 object-cover"
            />
            <p className="text-6xl font-serif italic">Leaderboard</p>
            {/*  <h1 className="text-2xl tracking-wider font-serif text-gray-900 dark:text-white sr-only">
              UNITAR
            </h1> */}
          </div>
          <div className="w-full py-20 px-52 flex flex-col items-center justify-center text-white text-center gap-2 bg-gradient-to-b from-[#0f1c3a] via-[#273e75] to-[#152852] ">
            <Image
              src="/sgstitle-2.png"
              alt="SGS Leaderboard"
              width={3000}
              height={1000}
              className="w-full h-auto object-contain -mt-32"
            />
            <p className="text-[4.5rem] font-thin italic">
              Stand A Chance To Win A{" "}
              <span className="font-bold  text-yellow-400">Perodua Myvi!</span>
            </p>
          </div>
          {/* Top Three Section */}
          <div className="relative flex flex-col items-center justify-center space-y-4 -translate-x-12">
            <div className="grid grid-cols-3  w-full items-end justify-around px-20">
              {/* Second Place */}
              <div className="relative flex flex-col items-center">
                <div className="h-96 w-96 border-2  rounded-t-xl bg-transparent border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] flex items-center justify-center -skew-x-12 translate-x-12 p-4">
                  <Image
                    src={`/ranks/${topThree[1]?.title || "Elite"}.svg`}
                    alt={topThree[1]?.nickname || "Legend"}
                    width={1000}
                    height={1000}
                    className="w-full rounded-xl object-cover object-center p-2 skew-x-12 -translate-x-3"
                  />
                </div>
                <span className="-mt-2 text-[3.5rem]  px-3 rounded-b-[1rem] text-blue-900 bg-blue-100 uppercase font-bold z-20 min-w-96 text-center -skew-x-12 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
                  {topThree[1]?.nickname}
                </span>
                <span className="mt-6 text-[3rem] text-gray-500 dark:text-gray-300 italic">
                  {topThree[1]?.title}
                </span>
                <span className="text-[4rem] text-gray-500 dark:text-gray-200">
                  RM {topThree[1]?.total_bounty.toLocaleString("en-US")}
                </span>
                <span className="text-[2.5rem] uppercase text-gray-500 dark:text-gray-200">
                  Campus {topThree[1]?.campus}
                </span>
              </div>

              {/* First Place */}
              <div className="relative flex flex-col items-center">
                <div className="h-[30rem] w-[30rem] border-2 rounded-t-xl bg-transparent border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] flex items-center justify-center -skew-x-12 translate-x-16">
                  <Image
                    src={`/ranks/${topThree[0]?.title || "Elite"}.svg`}
                    alt={topThree[1]?.nickname || "Mythic"}
                    width={1000}
                    height={1000}
                    className="w-full rounded-xl object-cover object-center p-2 -translate-x-3 skew-x-12 scale-110 pb-20"
                  />
                </div>
                <span className="-mt-2 text-[4.5rem] tracking-wide px-3 rounded-b-[1rem] text-blue-100 bg-blue-900 uppercase font-bold z-20 min-w-[30rem] text-center -skew-x-12 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] translate-x-1">
                  {topThree[0]?.nickname}
                </span>
                <span className="mt-6 text-[5rem] text-gray-500 dark:text-gray-300 italic">
                  {topThree[0]?.title}
                </span>
                <span className="-mt-4 text-[6rem] text-gray-500 dark:text-yellow-400 font-bold">
                  RM {topThree[0]?.total_bounty.toLocaleString("en-US")}
                </span>
                <span className="text-[2.5rem] uppercase text-gray-500 dark:text-gray-200">
                  Campus {topThree[0]?.campus}
                </span>
              </div>

              {/* Third Place */}
              <div className="relative flex flex-col items-center">
                <div className="h-96 w-96 border-2 rounded-t-xl bg-transparent border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] flex items-center justify-center -skew-x-12 translate-x-12 p-4">
                  <Image
                    src={`/ranks/${topThree[2]?.title || "Elite"}.svg`}
                    alt={topThree[1]?.nickname || "Elite"}
                    width={1000}
                    height={1000}
                    className="rounded-xl object-cover object-center p-2 -translate-x-2 skew-x-12 "
                  />
                </div>
                <span className="-mt-2 text-[3.5rem] tracking-wide px-3 rounded-b-[1rem] text-blue-900 bg-blue-100 uppercase font-bold z-20 min-w-96 text-center -skew-x-12 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
                  {topThree[2]?.nickname}
                </span>
                <span className="mt-6 text-[3rem] text-gray-500 dark:text-gray-300 italic">
                  {topThree[2]?.title}
                </span>
                <span className="text-[4rem] text-gray-500 dark:text-gray-200">
                  RM {topThree[2]?.total_bounty.toLocaleString("en-US")}
                </span>
                <span className="text-[2.5rem] uppercase text-gray-500 dark:text-gray-200">
                  Campus {topThree[2]?.campus}
                </span>
              </div>
            </div>
          </div>

          {/* Rest of Leaderboard Section */}
          <ScrollArea className="min-h-[30rem] px-32 py-18 py-4 pt-8">
            <div className="flex flex-row items-center justify-between px-4 py-10 text-xs italic text-gray-300 text-[3rem]">
              <p className="text-[2rem]">No.</p>
              <p className="-translate-x-[380px] text-[2rem] uppercase">
                Nickname <span className="text-[2rem]">campus</span>
              </p>
              <p className="text-[2rem]">Bounty*</p>
            </div>
            <div className="space-y-14 text-[4rem]">
              {restOfLeaderboard.map((entry, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between rounded-[2rem] p-10 py-1 border-2 border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f]`}
                >
                  <div className="flex items-center space-x-20 relative">
                    <span
                      className={`w-6 text-center text-[4rem] font-thin $"text-gray-500 dark:text-gray-300"
                      `}
                    >
                      {index + 4}
                    </span>
                    <div className="h-[14rem] w-[14rem] rounded-xl absolute left-0 flex items-center justify-center">
                      <Image
                        src={`/ranks/${entry.title}.svg`}
                        alt={entry.nickname}
                        width={1000}
                        height={1000}
                        className="rounded-xl object-cover object-center p-6 -translate-y-4"
                      />
                    </div>
                    <div className="flex flex-col gap-0 pl-60">
                      <p
                        className={`text-[4rem] tracking-wide rounded-sm text-blue-100 uppercase font-bold`}
                      >
                        {" "}
                        {entry.nickname}{" "}
                        <span className="text-[2.5rem] font-normal">
                          Campus {entry.campus}{" "}
                        </span>
                      </p>
                      <span
                        className={`-mt-4 text-[3rem] text-gray-500 dark:text-gray-300 italic`}
                      >
                        {entry.title}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-md font-thin "text-gray-500 dark:text-white
                    `}
                  >
                    RM {entry.total_bounty.toLocaleString("en-US")}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className="flex flex-row w-full items-start justify-center text-balance mx-auto px-32 gap-20">
        <p className="text-[2.5rem] italic text-gray-500 dark:text-gray-300">
          *Bounty shown are estimated count and does not reflect the actual
          incentive amount. Please scan the QR code to view the{" "}
          <span className="text-blue-400">terms and conditions</span> for more
          details.
        </p>
        <Image
          src="/sgsterms.svg"
          alt="QR Code for Terms and Conditions"
          width={1000}
          height={1000}
          className="w-60 h-60 object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="flex flex-row items-center justify-between space-x-2 mx-auto px-32">
        <Link
          href="https://www.unitar.my"
          className="text-[3.5rem] text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
        >
          unitar.my
        </Link>
        <Image
          src="/accel-white.png"
          alt="Accelerate Your Future"
          width={1000}
          height={1000}
          className="w-[48rem] h-auto object-cover -px-20 translate-x-8"
        />
      </div>
    </main>
  );
}
