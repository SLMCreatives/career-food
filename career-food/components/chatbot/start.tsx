"use client";

import { useState } from "react";
import NotificationChatbot from "@/components/chatbot/chatbot";
import { createClient } from "@supabase/supabase-js";
import { signOutAction } from "@/app/actions";
import { RefreshCcw, Trash2 } from "lucide-react";

export default function StartPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  const [start, setStart] = useState(false);
  const [userexist, setUserexist] = useState(false);
  const [results, setResults] = useState(false);
  const startQuiz = () => {
    /* checkUserexist(); */
    anonUsersignin();
  };

  const checkUserexist = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (!data) {
      console.log("new User", data);
      anonUsersignin();
    } else {
      console.log("success", data);
      window.location.href = "/results";
    }
  };

  const refreshSession = async () => {
    const { data, error } = await supabase.auth.refreshSession();
    if (data.session === null) {
      anonUsersignin();
      setStart(true);
    } else {
      console.log("success", data);
    }
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

  const userSignout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      console.log("success");
    }
  };

  const deleteRow = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("users_answers")
      .delete()
      .eq("user_id", user?.id);

    if (error) {
      console.log("error", error);
    } else {
      console.log("user deleted");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      {start ? (
        <NotificationChatbot />
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 pt-10 px-8 ">
          <h1 className="text-4xl font-bold">
            Welcome to UNITAR Persona Check: Ramadhan Edition
          </h1>
          <p className="text-lg text-center">
            This quiz will help you to find the best career path that suits you
            best. Plus the best ramadan food that represents you!
          </p>
          <p>
            In todays fast-paced world, finding the perfect career path can be a
            daunting task. That is where our career finder comes in!
          </p>

          <p>
            Answer a few questions and find out your ideal career path, and
            Ramadhan food soulmate.
          </p>

          <p>
            This is a fun way to determine which career would suit your best and
            how to get there.
          </p>

          <div className="py-8 flex flex-row gap-4">
            <button
              onClick={() => startQuiz()}
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              Start Quiz
            </button>
            {/* <button
              onClick={() => deleteRow()}
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              <Trash2 className="w-6 h-6" />
            </button> */}
          </div>
          {/*  <div className="w-80 h-72 border border-gray-400 rounded-sm bg-gray-50 items-center justify-center flex flex-col">
            <p className="text-md text-fuchsia-500 text-center pt-4">
              Sulaiman is an Popiah
            </p>
            <p className="text-md text-fuchsia-500 text-center pt-4">
              Zahin is an Bubur Lambuk
            </p>
            <p className="text-md text-fuchsia-500 text-center pt-4">
              Kane is an Kuih Lapis
            </p>
            <p className="text-md text-fuchsia-500 text-center pt-4">
              Lisna is an Murtabak
            </p>
          </div> */}
        </div>
      )}

      {results ? (
        <div className="flex flex-col items-center justify-center gap-4 pt-10 px-8 ">
          <h1 className="text-4xl font-bold">You are a Popiah!</h1>
          <button
            onClick={() => userSignout()}
            className="bg-primary text-white px-4 py-2 rounded-md"
          >
            Take Quiz Again
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
