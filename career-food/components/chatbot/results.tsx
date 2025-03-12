"use client";

import { signOutAction } from "@/app/actions";
import { createClient } from "@supabase/supabase-js";
import { Share2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

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
      if (myicon === "Bubur Lambuk") {
        setIconImage("/persona/bubur.jpg");
      }
      if (myicon === "Air Katira") {
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

  const shareIcon = () => {
    navigator.clipboard.writeText(iconImage);
  };
  return (
    <>
      <Image
        src="/pcre_logo.png"
        alt="Persona Check Ramadan Edition"
        width={300}
        height={300}
        className="max-w-60 h-full -mt-20 "
      />
      <p className="text-xl font-bold -mt-10">
        Your Results Are In! You Are...
      </p>
      <Image
        src={iconImage || "/pcre_logo.png"}
        alt="Food Item"
        className="w-auto h-auto shadow-md rounded-md"
        width={384}
        height={384}
      />

      <div className="flex flex-row gap-2 mx-auto items-center">
        <Button
          onClick={() => signOutAction()}
          className="bg-primary text-white px-4 py-2 rounded-md"
        >
          Take Quiz Again
        </Button>
        <Button
          onClick={() => shareIcon()}
          className="bg-primary text-white px-4 py-2 rounded-md"
        >
          <Share2 className="w-6 h-6" />
        </Button>
      </div>
      {/* <button
        onClick={() => deleteRow()}
        className="bg-primary text-white px-4 py-2 rounded-md"
      >
        <Trash2 className="w-6 h-6" />
      </button> */}
      <hr></hr>

      <div className="flex flex-col items-center justify-center gap-8 py-20">
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
