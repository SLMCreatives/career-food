"use client";

import { useState } from "react";
import NotificationChatbot from "@/components/chatbot/chatbot";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../ui/card";
import { Button } from "../ui/button";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function StartPage() {
  const [start, setStart] = useState(false);
  const [userexist, setUserexist] = useState(false);
  const [results, setResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const startQuiz = () => {
    setIsLoading(true);
    anonUsersignin();
  };

  const anonUsersignin = async () => {
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) {
      console.log(error);
    } else {
      console.log("success", data);
      setStart(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      {start ? (
        <NotificationChatbot />
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 lg:gap-2 md:pt-10 lg:pt-0 px-8 lg:h-[70vh]">
          <h1 className="text-4xl sr-only font-bold">
            UNITAR Persona Check: Ramadan Edition
          </h1>
          <Image
            src="/pcre_logo.png"
            alt="Persona Check Ramadan Edition"
            width={600}
            height={600}
            className="w-full h-full max-w-xl"
          />
          <Card className="w-full max-w-md rounded-lg drop-shadow-xl text-balance">
            <CardHeader>
              <CardTitle>Check Which Career Suits You!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <p className=" text-center">
                  This quiz will help you to find the best career path that
                  suits you best. Plus the best Ramadan Bazaar food that
                  represents you!
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                onClick={() => startQuiz()}
                variant="default"
                /* className="bg-primary dark:text-black text-white px-4 py-2 rounded-md" */
              >
                {isLoading ? "Loading..." : "Start Here"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
