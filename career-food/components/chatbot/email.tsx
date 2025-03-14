"use client";

import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Send } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "../ui/card";
import { Input } from "../ui/input";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function EmailSubmit() {
  const [email, setEmail] = useState("");
  const viewResults = async () => {
    redirect("/results");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEmailSubmit();
    }
  };

  const handleEmailSubmit = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("users_answers")
      .update({ email: email })
      .eq("user_id", user?.id);
    if (error) {
      console.log(error);
    } else {
      redirect("/results");
    }
  };
  return (
    <div className="flex items-center gap-4">
      <Card className="w-full max-w-md rounded-lg drop-shadow-xl text-balance">
        <CardHeader>
          <CardTitle className="text-center">Last Step!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 items-center w-full">
            <p>Enter your email to view your results!</p>
            <Input
              type="text"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              /* placeholder="Enter your email address" */
              className="flex-1 bg-gray-200 text-black text-center rounded-full py-3 px-6 mr-2 focus:outline-none w-full"
            />
            <Button onClick={handleEmailSubmit} size={"sm"} variant={"default"}>
              View Results
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center"></CardFooter>
      </Card>
    </div>
  );
}
