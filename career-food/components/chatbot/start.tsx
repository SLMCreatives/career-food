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
        <div className="flex flex-col items-center justify-center gap-4 pt-10 px-8 ">
          <h1 className="text-4xl sr-only font-bold">
            UNITAR Persona Check: Ramadan Edition
          </h1>
          <Image
            src="/pcre_logo.png"
            alt="Persona Check Ramadan Edition"
            width={300}
            height={300}
            className="w-full h-full max-w-xl"
          />
          <Card className="w-full max-w-xl rounded-lg drop-shadow-xl text-balance">
            <CardHeader>
              <CardTitle>Check Which Career Suits You!</CardTitle>
              {/* <CardDescription>
                Here is a fun quiz that can give you a little bit of insight
                into your personality and best suited career for you.
              </CardDescription> */}
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <p className=" text-center">
                  This quiz will help you to find the best career path that
                  suits you best. Plus the best ramadan food that represents
                  you!
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
