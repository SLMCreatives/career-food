"use client";

import { signOutAction } from "@/app/actions";
import { createClient } from "@supabase/supabase-js";
import { Download, RefreshCw, Share2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import FileSaver, { saveAs } from "file-saver";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "../ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  InstagramIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon
} from "next-share";

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
    image: "/persona/martabak.jpg",
    icon: "/icons/martabak.png"
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
  const [open, setOpen] = useState(false);
  const [openEmail, setOpenemail] = useState(false);

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
      if (myicon === "Martabak") {
        setIconImage("/persona/martabak.jpg");
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
      if (myicon === "Martabak") {
        setIconSticker("/icons/martabak.png");
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
    <div className="flex flex-col items-center justify-start gap-8 -mt-10">
      <div className="flex flex-col gap-2 items-center">
        <Image
          src="/new-logo.png"
          alt="Persona Check Ramadan Edition"
          width={600}
          height={600}
          className="w-48 h-auto"
        />
        <p className="text-xl font-bold text-white">Your Results Are In!</p>
      </div>
      <div className="flex flex-col gap-4 px-4 items-center lg:max-w-xl">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Image
              src={iconImage || "/pcre_logo.png"}
              alt="Food Item"
              className="w-auto h-auto drop-shadow-lg rounded-lg hover:drop-shadow-2xl lg:hover:scale-110 transition-all duration-300 ease-in-out"
              width={1080}
              height={1080}
              loading="eager"
            />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-white text-2xl font-bold">
                {myicon}
              </DialogTitle>
            </DialogHeader>
            <Image
              src={iconImage || "/pcre_logo.png"}
              alt="Food Item"
              className="w-auto h-auto drop-shadow-lg rounded-lg"
              width={1080}
              height={1080}
              loading="eager"
            />
          </DialogContent>
        </Dialog>
        {/* <Image
          src={iconImage || "/pcre_logo.png"}
          alt="Food Item"
          className="w-auto h-auto drop-shadow-lg rounded-lg hover:drop-shadow-2xl lg:hover:scale-110 transition-all duration-300 ease-in-out"
          width={1080}
          height={1080}
        /> */}
      </div>

      <div className="flex flex-row gap-4 items-center">
        <p className="text-md text-white">Share With Friends</p>
        <div className="flex flex-row gap-2">
          <WhatsappShareButton
            url={"https://quiz.unitar.my"}
            title={"Check out my Persona! I'm a " + myicon + ". What are you?"}
            separator="::"
          >
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>
          <FacebookShareButton
            url={"https://quiz.unitar.my"}
            quote={"Check out my Persona! I'm a " + myicon + ". What are you?"}
            hashtag={"#unitarquiz"}
          >
            <FacebookIcon size={40} round />
          </FacebookShareButton>
          <LinkedinShareButton url={"https://quiz.unitar.my"}>
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>
          <TwitterShareButton
            url={"https://quiz.unitar.my"}
            title={"Check out my Persona! I'm a " + myicon + ". What are you?"}
          >
            <TwitterIcon size={40} round />
          </TwitterShareButton>
        </div>
      </div>
      <div className="flex flex-row gap-6 items-center">
        <Button
          onClick={() => handleReset()}
          variant={"default"}
          size={"sm"}
          /* className="bg-primary text-white px-4 py-2 rounded-md" */
        >
          <RefreshCw className="w-6 h-6" /> Reset Quiz
        </Button>
        <Button
          onClick={() => shareIcon()}
          variant={"default"}
          size={"sm"}
          /* className="bg-primary text-white px-4 py-2 rounded-md" */
        >
          <Download className="w-6 h-6" /> Save Persona
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center gap-8 py-20 px-10 lg:max-w-xl">
        <h2 className="text-3xl text-white font-bold">Other Personas</h2>
        <div className="lg:flex flex-col gap-16  hidden">
          <Carousel className="w-full mx-auto max-w-xs lg:max-w-2xl lg:px-8">
            <CarouselContent>
              {persona
                .filter((item) => item.name !== myicon)
                .map((item) => (
                  <CarouselItem
                    key={item.id}
                    className="w-full h-auto items-center space-y-6"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="w-full h-auto drop-shadow-lg rounded-lg"
                      width={1080}
                      height={1080}
                      loading={"lazy"}
                    />
                    {
                      <p className="text-2xl text-white text-center font-bold">
                        {item.name}
                      </p>
                    }{" "}
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="flex flex-col gap-16  lg:hidden">
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
                  width={1080}
                  height={1080}
                />
                {
                  <p className="text-2xl text-white font-bold">{item.name}</p>
                }{" "}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
