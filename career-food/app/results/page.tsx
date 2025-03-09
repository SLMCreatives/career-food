"use client";

import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

const answers = [];

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function ResultsPage() {
  const userSignout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      console.log("success");
      window.location.href = "/";
    }
  };
  return (
    <div className="flex flex-col items-center justify-centerpx-8 gap-6">
      <h1 className="text-4xl font-bold">You are a Popiah!</h1>
      <Image
        src="/persona/popiah.jpg"
        alt="Popiah"
        className="w-auto h-auto shadow-md rounded-md"
        width={384}
        height={384}
      />
      <button
        onClick={() => userSignout()}
        className="bg-primary text-white px-4 py-2 rounded-md"
      >
        Take Quiz Again
      </button>

      <div className="flex flex-col gap-4">
        <Image
          src="/persona/bubur.jpg"
          alt="Bubur"
          className="w-auto h-auto shadow-md rounded-md"
          width={384}
          height={384}
        />
        <Image
          src="/persona/katira.jpg"
          alt="Katira"
          className="w-auto h-auto shadow-md rounded-md"
          width={384}
          height={384}
        />
        <Image
          src="/persona/kuihlapis.jpg"
          alt="Kuih Lapis"
          className="w-auto h-auto shadow-md rounded-md"
          width={384}
          height={384}
        />
        <Image
          src="/persona/pelita.jpg"
          alt="Tepung Pelita"
          className="w-auto h-auto shadow-md rounded-md"
          width={384}
          height={384}
        />
        <Image
          src="/persona/murtabak.jpg"
          alt="Murtabak"
          className="w-auto h-auto shadow-md rounded-md"
          width={384}
          height={384}
        />
        <Image
          src="/persona/soya.jpg"
          alt="Soya Cincau"
          className="w-auto h-auto shadow-md rounded-md"
          width={384}
          height={384}
        />
      </div>
    </div>
  );
}
