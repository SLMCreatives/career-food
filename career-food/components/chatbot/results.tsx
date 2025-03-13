"use client";

import { signOutAction } from "@/app/actions";
import { createClient } from "@supabase/supabase-js";
import { Download, RefreshCw, Share2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import FileSaver, { saveAs } from "file-saver";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

const persona = [
  {
    id: 1,
    name: "Bubur Lambuk",
    image: "/persona/bubur.jpg",
    icon: "/icons/bubur.png"
  },
  {
    id: 2,
    name: "Kuih Lapis",
    image: "/persona/kuihlapis.jpg",
    icon: "/icons/kuihlapis.png"
  },
  {
    id: 3,
    name: "Air Katira",
    image: "/persona/katira.jpg",
    icon: "/icons/katira.png"
  },
  {
    id: 4,
    name: "Martabak",
    image: "/persona/murtabak.jpg",
    icon: "/icons/murtabak.png"
  },
  {
    id: 5,
    name: "Popiah",
    image: "/persona/popiah.jpg",
    icon: "/icons/popiah.png"
  },
  {
    id: 6,
    name: "Soya Cincau",
    image: "/persona/soya.jpg",
    icon: "/icons/soya.png"
  },
  {
    id: 7,
    name: "Tepung Pelita",
    image: "/persona/pelita.jpg",
    icon: "/icons/pelita.png"
  }
];

export default function ResultsSection() {
  const [myicon, setMyicon] = useState("");
  const [iconImage, setIconImage] = useState("");
  const [iconSticker, setIconSticker] = useState("");

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

  useEffect(() => {
    const handleiconSticker = async () => {
      if (myicon === "Kuih Lapis") {
        setIconSticker("/icons/kuihlapis.png");
      }
      if (myicon === "Bubur Lambuk") {
        setIconSticker("/icons/bubur.png");
      }
      if (myicon === "Air Katira") {
        setIconSticker("/icons/katira.png");
      }
      if (myicon === "Tepung Pelita") {
        setIconSticker("/icons/pelita.png");
      }
      if (myicon === "Murtabak") {
        setIconSticker("/icons/murtabak.png");
      }
      if (myicon === "Soya Cincau") {
        setIconSticker("/icons/soya.png");
      }
    };

    handleiconSticker();
  }, [myicon]);

  const shareIcon = () => {
    /*     navigator.clipboard.writeText(iconImage);
     */ FileSaver.saveAs(iconImage, "myicon.png");
  };

  const handleReset = () => {
    /* deleteRow(); */
    signOutAction();
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
      <p className="text-xl font-bold -mt-10 text-white">
        Congratulations! You are...
      </p>
      <div className="flex flex-col gap-4 px-4 items-center">
        <Image
          src={iconImage || "/pcre_logo.png"}
          alt="Food Item"
          className="w-auto h-auto drop-shadow-lg rounded-lg"
          width={384}
          height={384}
        />
      </div>

      <div className="flex flex-row gap-6 items-center">
        <Button
          onClick={() => handleReset()}
          variant={"outline"}
          size={"icon"}
          /* className="bg-primary text-white px-4 py-2 rounded-md" */
        >
          <RefreshCw className="w-6 h-6" />
        </Button>
        <Button
          onClick={() => shareIcon()}
          variant={"outline"}
          size={"icon"}
          /* className="bg-primary text-white px-4 py-2 rounded-md" */
        >
          <Download className="w-6 h-6" />
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center gap-8 py-20 px-10">
        <h2 className="text-3xl text-white font-bold">Other Personas</h2>
        <div className="flex flex-col gap-10">
          {persona
            .filter((item) => item.name !== myicon)
            .map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 items-center justify-center"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-auto h-auto drop-shadow-lg rounded-lg"
                  width={384}
                  height={384}
                />
                {
                  <p className="text-2xl text-white font-bold">{item.name}</p>
                }{" "}
              </div>
            ))}
          {/* {persona.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 items-center justify-center"
            >
              <Image
                src={item.image}
                alt={item.name}
                className="w-auto h-auto drop-shadow-lg rounded-lg"
                width={384}
                height={384}
              />
              {<p className="text-2xl font-bold">{item.name}</p>}{" "}
            </div>
          ))} */}
        </div>
      </div>
    </>
  );
}
