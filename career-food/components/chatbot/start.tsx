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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import Autoplay from "embla-carousel-autoplay";

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
        <div className="flex flex-col items-center justify-center gap-28 lg:gap-32 md:pt-10 lg:pt-0 lg:px-8">
          <h1 className="text-4xl sr-only font-bold">
            UNITAR Persona Check: Ramadan Edition
          </h1>
          <div className="flex flex-col gap-4 py-32">
            <Image
              src="/new-logo.png"
              alt="Persona Check Ramadan Edition"
              width={600}
              height={600}
              className="w-full h-auto max-w-2xl drop-shadow-2xl"
            />
            <Carousel
              opts={{
                align: "start",
                loop: true
              }}
              plugins={[
                Autoplay({
                  delay: 2000
                })
              ]}
              className="w-full max-w-md md:max-w-3xl lg:max-w-4xl"
            >
              <CarouselContent>
                {persona.map((item: any, index: number) => (
                  <CarouselItem key={index} className="basis-1/4">
                    <div className="p-1">
                      <Card className="bg-transparent border-0">
                        <CardContent className="flex items-center justify-center p-0">
                          <Image
                            src={item.icon}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="w-52 lg:w-56 h-auto"
                          />
                          <span className="text-3xl font-semibold sr-only">
                            {item.name}
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <Button
              onClick={() => startQuiz()}
              variant="default"
              /* className="bg-primary dark:text-black text-white px-4 py-2 rounded-md" */
            >
              {isLoading ? "Loading..." : "Start Here"}
            </Button>
          </div>

          {/* <Card className="w-full max-w-md rounded-lg drop-shadow-xl text-balance">
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
              >
                {isLoading ? "Loading..." : "Start Here"}
              </Button>
            </CardFooter>
          </Card> */}
        </div>
      )}
    </div>
  );
}
