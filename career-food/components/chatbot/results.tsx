"use client";

import { signOutAction } from "@/app/actions";
import { createClient } from "@supabase/supabase-js";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function ResultsSection() {
  const [myicon, setMyicon] = useState("");
  const [iconImage, setIconImage] = useState("");

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

  const getIcon = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (!user) {
      console.log("No user");
      window.location.href = "/";
    } else {
      const { data, error } = await supabase
        .from("users_answers")
        .select("*")
        .eq("user_id", user?.id);
      if (error) {
        console.log(error);
      } else {
        setMyicon(data[0].icon);
      }
    }
  };

  useEffect(() => {
    getIcon();
  }, []);

  useEffect(() => {
    const handleiconImage = async () => {
      if (myicon === "Kuih Lapis") {
        setIconImage("/persona/kuihlapis.jpg");
      }
      if (myicon === "Bubur") {
        setIconImage("/persona/bubur.jpg");
      }
      if (myicon === "Katira") {
        setIconImage("/persona/katira.jpg");
      }
      if (myicon === "Tepung Pelita") {
        setIconImage("/persona/pelita.jpg");
      }
      if (myicon === "Murtabak") {
        setIconImage("/persona/murtabak.jpg");
      }
      if (myicon === "Soya Cincau") {
        setIconImage("/persona/soya.jpg");
      }
    };

    handleiconImage();
  }, [myicon]);

  console.log(myicon, iconImage);
  return (
    <>
      <h1 className="text-4xl font-bold">You are a {myicon}</h1>
      <Image
        src={iconImage}
        alt="Food Item"
        className="w-auto h-auto shadow-md rounded-md"
        width={384}
        height={384}
      />

      <button
        onClick={() => signOutAction()}
        className="bg-primary text-white px-4 py-2 rounded-md"
      >
        Take Quiz Again
      </button>
      {/* <button
        onClick={() => deleteRow()}
        className="bg-primary text-white px-4 py-2 rounded-md"
      >
        <Trash2 className="w-6 h-6" />
      </button> */}
      <hr></hr>

      <div className="flex flex-col items-center justify-center gap-4 py-20 bg-stone-50">
        <h2 className="text-3xl font-bold">All Food Icons</h2>
        <Image
          src="/persona/bubur.jpg"
          alt="Bubur"
          className="w-auto h-auto shadow-lg pt-4 rounded-md"
          width={384}
          height={384}
        />
        <Image
          src="/persona/katira.jpg"
          alt="Katira"
          className="w-auto h-auto shadow-lg pt-4 rounded-md"
          width={384}
          height={384}
        />
        <Image
          src="/persona/kuihlapis.jpg"
          alt="Kuih Lapis"
          className="w-auto h-auto shadow-lg pt-4 rounded-md"
          width={384}
          height={384}
        />
        <Image
          src="/persona/pelita.jpg"
          alt="Tepung Pelita"
          className="w-auto h-auto shadow-lg pt-4 rounded-md"
          width={384}
          height={384}
        />
        <Image
          src="/persona/murtabak.jpg"
          alt="Murtabak"
          className="w-auto h-auto shadow-lg pt-4 rounded-md"
          width={384}
          height={384}
        />
        <Image
          src="/persona/soya.jpg"
          alt="Soya Cincau"
          className="w-auto h-auto shadow-lg pt-4 rounded-md"
          width={384}
          height={384}
        />
        <Image
          src="/persona/popiah.jpg"
          alt="Popiah"
          className="w-auto h-auto shadow-lg pt-4 rounded-md"
          width={384}
          height={384}
        />
      </div>
    </>
  );
}
