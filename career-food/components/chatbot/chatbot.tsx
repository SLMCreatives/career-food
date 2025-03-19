"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { Button } from "../ui/button";

export type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  options?: Option[];
};

type Option = {
  text: string;
  value: string;
  action: () => void;
};

export type QuizAnswers = {
  personality: {
    ei: string;
    sn: string;
    tf: string;
    jp: string;
  };
  career: {
    environment: string;
    passion: string;
    strength: string;
    industry: string;
  };
};

interface FoodCharacteristic {
  name: string;
  traits: {
    complex: number; // 1-10 scale: simple to complex
    traditional: number; // 1-10 scale: modern to traditional
    sweet: number; // 1-10 scale: savory to sweet
    social: number; // 1-10 scale: individual to communal
    preparation: number; // 1-10 scale: quick to elaborate
    description: string; // Short description of the food
    mbtiAffinities: string[]; // Primary MBTI types this food resonates with
  };
}

const foodDatabase: FoodCharacteristic[] = [
  {
    name: "Bubur Lambuk",
    traits: {
      complex: 6,
      traditional: 9,
      sweet: 3,
      social: 8,
      preparation: 7,
      description:
        "A comforting, traditional rice porridge that brings people together.",
      mbtiAffinities: ["ISTJ", "ISFJ", "ESFJ"]
    }
  },
  {
    name: "Soya Cincau",
    traits: {
      complex: 4,
      traditional: 6,
      sweet: 7,
      social: 5,
      preparation: 4,
      description:
        "A refreshing, balanced drink that offers both sweetness and depth.",
      mbtiAffinities: ["INFJ", "INTP", "ENFJ"]
    }
  },
  {
    name: "Popiah",
    traits: {
      complex: 7,
      traditional: 8,
      sweet: 4,
      social: 6,
      preparation: 8,
      description:
        "A meticulously crafted spring roll with multiple components working in harmony.",
      mbtiAffinities: ["INTJ", "ISTP"]
    }
  },
  {
    name: "Kuih Lapis",
    traits: {
      complex: 8,
      traditional: 9,
      sweet: 8,
      social: 7,
      preparation: 9,
      description:
        "A beautiful multi-layered cake requiring patience and precision.",
      mbtiAffinities: ["ISFP", "INFP", "ENFP"]
    }
  },
  {
    name: "Martabak",
    traits: {
      complex: 7,
      traditional: 7,
      sweet: 5,
      social: 8,
      preparation: 6,
      description:
        "A versatile, flavorful stuffed pancake that's both hearty and satisfying.",
      mbtiAffinities: ["ESTP", "ENTP"]
    }
  },
  {
    name: "Air Katira",
    traits: {
      complex: 5,
      traditional: 8,
      sweet: 8,
      social: 7,
      preparation: 4,
      description:
        "A vibrant, fun, and refreshing drink that stands out in a crowd.",
      mbtiAffinities: ["ESFP"]
    }
  },
  {
    name: "Tepung Pelita",
    traits: {
      complex: 6,
      traditional: 9,
      sweet: 8,
      social: 6,
      preparation: 7,
      description:
        "A structured, organized dessert with clear layers and boundaries.",
      mbtiAffinities: ["ESTJ", "ENTJ"]
    }
  }
];

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function PersonalityQuiz() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [showNotification, setShowNotification] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [quizStage, setQuizStage] = useState("intro");
  const [hitstart, setHitstart] = useState(false);
  const [qOne, setqOne] = useState("");
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({
    personality: { ei: "", sn: "", tf: "", jp: "" },
    career: { environment: "", passion: "", strength: "", industry: "" }
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Format date as MM/DD
    const date = new Date();
    const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    // Start the quiz when chat is opened
    if (showChat) {
      preQuiz();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showChat]);

  const preQuiz = () => {
    const preQuizMessage: Message = {
      id: Date.now(),
      text: `Hi ${name}! 👋`,
      sender: "bot",
      options: [
        {
          text: "Hellooo",
          value: "next",
          action: () => prestartQuiz()
        },
        {
          text: "*Don't Reply*",
          value: "stillnext",
          action: () => prestartQuiz()
        }
      ]
    };
    setMessages([preQuizMessage]);
  };

  const prestartQuiz = () => {
    const introMessage: Message = {
      id: Date.now(),
      text: `Welcome to the most important quiz of your life! Okay, maybe not the most important, but close enough.`,
      sender: "bot",
      options: [
        {
          text: "Not another one!",
          value: "start-one",
          action: () => startQuiz()
        },
        {
          text: "Brother Ughh",
          value: "start-two",
          action: () => startQuiz()
        }
      ]
    };
    setMessages([introMessage]);
  };

  const startQuiz = () => {
    const introMessage: Message = {
      id: Date.now(),
      text: `Let's figure out your personality, ideal career, and—most importantly—the Ramadan food that defines your soul.\n\nAll you have to do is pick an answer. Easy, right?`,
      sender: "bot",
      options: [
        {
          text: "Let's do this!",
          value: "start",
          action: () => startPersonalityQuestions()
        },
        {
          text: "Wait, what? Explain more.",
          value: "explain",
          action: () => explainMore()
        }
      ]
    };
    setMessages([introMessage]);
  };

  const explainMore = () => {
    const explainMessage: Message = {
      id: Date.now(),
      text: "You pick answers, I do all the brain work, and at the end, I tell you career match, in the form of your ultimate Ramadan food twin.\n\nSounds fun, right? Now stop stalling and let's go!",
      sender: "bot",
      options: [
        {
          text: "Okay, okay! Let's start.",
          value: "start",
          action: () => startPersonalityQuestions()
        }
      ]
    };
    setMessages((prev) => [...prev, explainMessage]);
  };

  const startPersonalityQuestions = () => {
    setQuizStage("ei");
    const eiQuestion: Message = {
      id: Date.now(),
      text: `Question 1. \n\nIt's the weekend. No school, no exams, no stress (unless your mom suddenly remembers you exist and assigns house chores).\n\nWhat's the plan ${name}?`,
      sender: "bot",
      options: [
        {
          text: "Party time! Bring on the people!",
          value: "E",
          action: () =>
            handlePersonalityAnswer(
              "ei",
              "E",
              "Ahh, a social butterfly! You probably have 20 different WhatsApp groups blowing up at all times."
            )
        },
        {
          text: "Quiet time with my book and tea.",
          value: "I",
          action: () =>
            handlePersonalityAnswer(
              "ei",
              "I",
              "Classic introvert move. Just you, your book, and the existential dread of Monday approaching."
            )
        },
        {
          text: "Small group hangout, good vibes only.",
          value: "E-",
          action: () =>
            handlePersonalityAnswer(
              "ei",
              "E-",
              "Ah, the safe middle ground. Social, but not too social. Balanced. Like a perfectly made teh tarik."
            )
        },
        {
          text: "Solo adventure, just me and the world.",
          value: "I+",
          action: () =>
            handlePersonalityAnswer(
              "ei",
              "I+",
              "Main character energy. Just don't get lost and end up on a 'Missing Persons' poster, okay?"
            )
        }
      ]
    };
    setMessages((prev) => [...prev, eiQuestion]);
  };

  const handlePersonalityAnswer = (
    category: string,
    value: string,
    response: string
  ) => {
    // Find the selected option text directly from the value
    // instead of relying on messages array which might have changed
    let selectedText = "";

    // Find the current question's options based on the category
    let currentOptions: Option[] = [];
    if (category === "ei") {
      currentOptions = [
        {
          text: "Party time! Bring on the people!",
          value: "E",
          action: () => {}
        },
        {
          text: "Quiet time with my book and tea.",
          value: "I",
          action: () => {
            handleqOne("ei", "I");
          }
        },
        {
          text: "Small group hangout, good vibes only.",
          value: "E-",
          action: () => {
            handleqOne("ei", "E-");
          }
        },
        {
          text: "Solo adventure, just me and the world.",
          value: "I+",
          action: () => {
            handleqOne("ei", "I+");
          }
        }
      ];
    } else if (category === "sn") {
      currentOptions = [
        {
          text: "Step-by-step, detailed instructions.",
          value: "S",
          action: () => {}
        },
        {
          text: "Show me a video, let me observe first.",
          value: "S-",
          action: () => {}
        },
        {
          text: "Just give me the main idea, I'll figure it out.",
          value: "N",
          action: () => {}
        },
        {
          text: "Jump in and figure it out along the way.",
          value: "N+",
          action: () => {}
        }
      ];
    } else if (category === "tf") {
      currentOptions = [
        {
          text: "Give them logical advice, straight to the point.",
          value: "T",
          action: () => {}
        },
        {
          text: "Just listen and offer emotional support.",
          value: "F",
          action: () => {}
        },
        {
          text: "Analyze both sides fairly before advising.",
          value: "T-",
          action: () => {}
        },
        {
          text: "Help them follow their heart, even if it makes no sense.",
          value: "F+",
          action: () => {}
        }
      ];
    } else if (category === "jp") {
      currentOptions = [
        {
          text: "Plan everything out, work on it early.",
          value: "J",
          action: () => {}
        },
        {
          text: "Do some research, but leave room for flexibility.",
          value: "J-",
          action: () => {}
        },
        {
          text: "Start last-minute but still finish on time.",
          value: "P-",
          action: () => {}
        },
        {
          text: "Completely wing it and hope for the best.",
          value: "P",
          action: () => {}
        }
      ];
    }

    // Find the selected option text
    const option = currentOptions.find((opt) => opt.value === value);
    if (option) {
      selectedText = option.text;
    }

    // Add user message with the selected text
    const userMessage: Message = {
      id: Date.now(),
      text: selectedText,
      sender: "user"
    };
    setMessages((prev) => [...prev, userMessage]);

    // Add bot response
    const botResponse: Message = {
      id: Date.now() + 1,
      text: response,
      sender: "bot"
    };
    setMessages((prev) => [...prev, botResponse]);

    // Update quiz answers
    if (category === "ei") {
      handleqOne("ei", value);
      setQuizAnswers((prev) => ({
        ...prev,
        personality: { ...prev.personality, ei: value }
      }));
      setTimeout(() => askSensingIntuitionQuestion(), 2000);
    } else if (category === "sn") {
      handleqTwo("sn", value);
      setQuizAnswers((prev) => ({
        ...prev,
        personality: { ...prev.personality, sn: value }
      }));
      setTimeout(() => askThinkingFeelingQuestion(), 2000);
    } else if (category === "tf") {
      handleqThree("tf", value);
      setQuizAnswers((prev) => ({
        ...prev,
        personality: { ...prev.personality, tf: value }
      }));
      setTimeout(() => askJudgingPerceivingQuestion(), 2000);
    } else if (category === "jp") {
      handleqFour("jp", value);
      setQuizAnswers((prev) => ({
        ...prev,
        personality: { ...prev.personality, jp: value }
      }));
      setTimeout(() => askWorkEnvironmentQuestion(), 2000);
    }
  };

  const askSensingIntuitionQuestion = () => {
    setQuizStage("sn");
    const snQuestion: Message = {
      id: Date.now(),
      text: "Question 2 \n\nYou're learning something new. What's your approach?",
      sender: "bot",
      options: [
        {
          text: "Step-by-step, detailed instructions.",
          value: "S",
          action: () =>
            handlePersonalityAnswer(
              "sn",
              "S",
              "You probably read instruction manuals. Respect. I, on the other hand, would just press buttons until something works."
            )
        },
        {
          text: "Show me a video, let me observe first.",
          value: "S-",
          action: () =>
            handlePersonalityAnswer(
              "sn",
              "S-",
              "YouTube University graduate. Got it."
            )
        },
        {
          text: "Just give me the main idea, I'll figure it out.",
          value: "N",
          action: () =>
            handlePersonalityAnswer(
              "sn",
              "N",
              "Big brain energy. Why get stuck in details when you can see the grand vision?"
            )
        },
        {
          text: "Jump in and figure it out along the way.",
          value: "N+",
          action: () =>
            handlePersonalityAnswer(
              "sn",
              "N+",
              "A risk-taker! Just make sure you don't end up with exploded chemistry experiments, yeah?"
            )
        }
      ]
    };
    setMessages((prev) => [...prev, snQuestion]);
  };

  const askThinkingFeelingQuestion = () => {
    setQuizStage("tf");
    const tfQuestion: Message = {
      id: Date.now(),
      text: "Third Questions\n\nYour bestie is having a crisis. What's your go-to move?",
      sender: "bot",
      options: [
        {
          text: "Give them logical advice, straight to the point.",
          value: "T",
          action: () =>
            handlePersonalityAnswer(
              "tf",
              "T",
              "No nonsense, no sugarcoating. You probably get called 'too blunt' at least once a week."
            )
        },
        {
          text: "Just listen and offer emotional support.",
          value: "F",
          action: () =>
            handlePersonalityAnswer(
              "tf",
              "F",
              "The friend everyone cries to. I hope they at least buy you food in return."
            )
        },
        {
          text: "Analyze both sides fairly before advising.",
          value: "T-",
          action: () =>
            handlePersonalityAnswer(
              "tf",
              "T-",
              "Debater vibes. You probably turn every group discussion into a courtroom session."
            )
        },
        {
          text: "Help them follow their heart, even if it makes no sense.",
          value: "F+",
          action: () =>
            handlePersonalityAnswer(
              "tf",
              "F+",
              "Ah, the hopeless romantic. Life isn't a K-drama, but I love the energy."
            )
        }
      ]
    };
    setMessages((prev) => [...prev, tfQuestion]);
  };

  const askJudgingPerceivingQuestion = () => {
    setQuizStage("jp");
    const jpQuestion: Message = {
      id: Date.now(),
      text: "Next Question...\n\nYou have a big project due next week. How do you handle it?",
      sender: "bot",
      options: [
        {
          text: "Plan everything out, work on it early.",
          value: "J",
          action: () =>
            handlePersonalityAnswer(
              "jp",
              "J",
              "You probably highlight your notes in multiple colors. Respect."
            )
        },
        {
          text: "Do some research, but leave room for flexibility.",
          value: "J-",
          action: () =>
            handlePersonalityAnswer(
              "jp",
              "J-",
              "A solid mix of strategy and adaptability. Not bad."
            )
        },
        {
          text: "Start last-minute but still finish on time.",
          value: "P-",
          action: () =>
            handlePersonalityAnswer(
              "jp",
              "P-",
              "Ah, the student life special. Panic + productivity = results."
            )
        },
        {
          text: "Completely wing it and hope for the best.",
          value: "P",
          action: () =>
            handlePersonalityAnswer(
              "jp",
              "P",
              "Do you thrive in chaos, or do you just like suffering?"
            )
        }
      ]
    };
    setMessages((prev) => [...prev, jpQuestion]);
  };

  const askWorkEnvironmentQuestion = () => {
    setQuizStage("career-environment");
    const environmentQuestion: Message = {
      id: Date.now(),
      text: "In your dream job, what kind of work environment would you prefer?",
      sender: "bot",
      options: [
        {
          text: "Structured, stable, and predictable.",
          value: "structured",
          action: () => handleCareerAnswer("environment", "structured")
        },
        {
          text: "Creative and flexible, full of new ideas.",
          value: "creative",
          action: () => handleCareerAnswer("environment", "creative")
        },
        {
          text: "Fast-paced and competitive, high energy.",
          value: "fast-paced",
          action: () => handleCareerAnswer("environment", "fast-paced")
        },
        {
          text: "Something active, hands-on, and physical.",
          value: "active",
          action: () => handleCareerAnswer("environment", "active")
        }
      ]
    };
    setMessages((prev) => [...prev, environmentQuestion]);
  };

  const handleCareerAnswer = (category: string, value: string) => {
    // Find the selected option text directly based on the category and value
    let selectedText = "";

    // Find the current question's options based on the category
    let currentOptions: Option[] = [];
    if (category === "environment") {
      currentOptions = [
        {
          text: "Structured, stable, and predictable.",
          value: "structured",
          action: () => {}
        },
        {
          text: "Creative and flexible, full of new ideas.",
          value: "creative",
          action: () => {}
        },
        {
          text: "Fast-paced and competitive, high energy.",
          value: "fast-paced",
          action: () => {}
        },
        {
          text: "Something active, hands-on, and physical.",
          value: "active",
          action: () => {}
        }
      ];
    } else if (category === "passion") {
      currentOptions = [
        {
          text: "Helping and guiding others.",
          value: "helping",
          action: () => {}
        },
        {
          text: "Creating art, stories, or entertainment.",
          value: "creating",
          action: () => {}
        },
        {
          text: "Solving problems, science and logic.",
          value: "solving",
          action: () => {}
        },
        {
          text: "Running my own business and making moves.",
          value: "business",
          action: () => {}
        }
      ];
    } else if (category === "strength") {
      currentOptions = [
        {
          text: "Logical thinking and strategy.",
          value: "logical",
          action: () => {}
        },
        {
          text: "Creativity and imagination.",
          value: "creativity",
          action: () => {}
        },
        {
          text: "Practical, hands-on skills.",
          value: "practical",
          action: () => {}
        },
        {
          text: "Communication and persuasion.",
          value: "communication",
          action: () => {}
        }
      ];
    } else if (category === "industry") {
      currentOptions = [
        { text: "Business & Finance 💼", value: "business", action: () => {} },
        { text: "Tech & IT 💻", value: "tech", action: () => {} },
        {
          text: "Psychology & Counseling 🧠",
          value: "psychology",
          action: () => {}
        },
        { text: "Arts & Entertainment 🎨", value: "arts", action: () => {} },
        {
          text: "Engineering & Science 🏗️",
          value: "engineering",
          action: () => {}
        },
        {
          text: "Education & Social Work 📚",
          value: "education",
          action: () => {}
        },
        {
          text: "Hospitality & Tourism ✈️",
          value: "hospitality",
          action: () => {}
        }
      ];
    }

    // Find the selected option text
    const option = currentOptions.find((opt) => opt.value === value);
    if (option) {
      selectedText = option.text;
    }

    // Add user message with the selected text
    const userMessage: Message = {
      id: Date.now(),
      text: selectedText,
      sender: "user"
    };
    setMessages((prev) => [...prev, userMessage]);

    // Update quiz answers
    if (category === "environment") {
      handleqFive("environment", value);
      setQuizAnswers((prev) => ({
        ...prev,
        career: { ...prev.career, environment: value }
      }));
      setTimeout(() => askPassionQuestion(), 2000);
    } else if (category === "passion") {
      handleqSix("passion", value);
      setQuizAnswers((prev) => ({
        ...prev,
        career: { ...prev.career, passion: value }
      }));
      setTimeout(() => askStrengthQuestion(), 2000);
    } else if (category === "strength") {
      handleqSeven("strength", value);
      setQuizAnswers((prev) => ({
        ...prev,
        career: { ...prev.career, strength: value }
      }));
      setTimeout(() => askIndustryQuestion(), 2000);
    } else if (category === "industry") {
      handleqEight("industry", value);
      setQuizAnswers((prev) => ({
        ...prev,
        career: { ...prev.career, industry: value }
      }));
      setTimeout(() => askSubmitResults(), 2000);
    }
  };

  const askPassionQuestion = () => {
    setQuizStage("career-passion");
    const passionQuestion: Message = {
      id: Date.now(),
      text: "If money didn't matter, which kind of job would you pick?",
      sender: "bot",
      options: [
        {
          text: "Helping and guiding others.",
          value: "helping",
          action: () => handleCareerAnswer("passion", "helping")
        },
        {
          text: "Creating art, stories, or entertainment.",
          value: "creating",
          action: () => handleCareerAnswer("passion", "creating")
        },
        {
          text: "Solving problems, science and logic.",
          value: "solving",
          action: () => handleCareerAnswer("passion", "solving")
        },
        {
          text: "Running my own business and making moves.",
          value: "business",
          action: () => handleCareerAnswer("passion", "business")
        }
      ]
    };
    setMessages((prev) => [...prev, passionQuestion]);
  };

  const askStrengthQuestion = () => {
    setQuizStage("career-strength");
    const strengthQuestion: Message = {
      id: Date.now(),
      text: "What's your biggest strength?",
      sender: "bot",
      options: [
        {
          text: "Logical thinking and strategy.",
          value: "logical",
          action: () => handleCareerAnswer("strength", "logical")
        },
        {
          text: "Creativity and imagination.",
          value: "creativity",
          action: () => handleCareerAnswer("strength", "creativity")
        },
        {
          text: "Practical, hands-on skills.",
          value: "practical",
          action: () => handleCareerAnswer("strength", "practical")
        },
        {
          text: "Communication and persuasion.",
          value: "communication",
          action: () => handleCareerAnswer("strength", "communication")
        }
      ]
    };
    setMessages((prev) => [...prev, strengthQuestion]);
  };

  const askIndustryQuestion = () => {
    setQuizStage("career-industry");
    const industryQuestion: Message = {
      id: Date.now(),
      text: "Which industry excites you the most?",
      sender: "bot",
      options: [
        {
          text: "Business & Finance 💼",
          value: "business",
          action: () => handleCareerAnswer("industry", "business")
        },
        {
          text: "Tech & IT 💻",
          value: "tech",
          action: () => handleCareerAnswer("industry", "tech")
        },
        {
          text: "Psychology & Counseling 🧠",
          value: "psychology",
          action: () => handleCareerAnswer("industry", "psychology")
        },
        {
          text: "Arts & Entertainment 🎨",
          value: "arts",
          action: () => handleCareerAnswer("industry", "arts")
        },
        {
          text: "Engineering & Science 🏗️",
          value: "engineering",
          action: () => handleCareerAnswer("industry", "engineering")
        },
        {
          text: "Education & Social Work 📚",
          value: "education",
          action: () => handleCareerAnswer("industry", "education")
        },
        {
          text: "Hospitality & Tourism ✈️",
          value: "hospitality",
          action: () => handleCareerAnswer("industry", "hospitality")
        }
      ]
    };
    setMessages((prev) => [...prev, industryQuestion]);
  };

  const askSubmitResults = () => {
    setQuizStage("submit");

    const resultsQuestion: Message = {
      id: Date.now(),
      text: "Ready to see your results?",
      sender: "bot",
      options: [
        {
          text: "Get my Results!",
          value: "results",
          action: () => {
            setTimeout(() => {
              getResultstwo();
            }, 2000);
          }
        }
      ]
    };
    setMessages((prev) => [...prev, resultsQuestion]);
  };

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // Add user message
    const newMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user"
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // For this quiz flow, we're not handling free text input
    // But we could add a response here if needed
    const botResponse: Message = {
      id: Date.now() + 1,
      text: "Please use the buttons to navigate through the quiz!",
      sender: "bot"
    };
    setTimeout(() => setMessages((prev) => [...prev, botResponse]), 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleOpenChat();
    }
  };

  const handleOpenChat = () => {
    setShowNotification(false);
    setShowChat(true);
    handlenameSubmit();
  };

  const handlenameSubmit = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("users_answers")
      .insert([{ user_id: user?.id, user_name: name }])
      .select();

    if (error) {
      console.log("error", error);
    } else {
      console.log("success");
    }
  };

  const handleIgnore = () => {
    setShowNotification(false);
  };

  const handleqOne = async (category: string, value: string) => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const valueLetter = value;

    console.log(valueLetter);

    const { data, error } = await supabase
      .from("users_answers")
      .update({ q_one: valueLetter })
      .eq("user_id", user?.id)
      .select();
    if (error) {
      console.log("error", error);
    } else {
      console.log("success", data);
    }
  };
  const handleqTwo = async (category: string, value: string) => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const valueLetter = value;

    const { data, error } = await supabase
      .from("users_answers")
      .update({ q_two: valueLetter })
      .eq("user_id", user?.id)
      .select();
    if (error) {
      console.log("error", error);
    } else {
      console.log("success", data);
    }
  };
  const handleqThree = async (category: string, value: string) => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const valueLetter = value;

    const { data, error } = await supabase
      .from("users_answers")
      .update({ q_three: valueLetter })
      .eq("user_id", user?.id)
      .select();
    if (error) {
      console.log("error", error);
    } else {
      console.log("success", data);
    }
  };
  const handleqFour = async (category: string, value: string) => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const valueLetter = value;

    const { data, error } = await supabase
      .from("users_answers")
      .update({ q_four: valueLetter })
      .eq("user_id", user?.id)
      .select();
    if (error) {
      console.log("error", error);
    } else {
      console.log("success", data);
    }
  };
  const handleqFive = async (category: string, value: string) => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("users_answers")
      .update({ q_five: value })
      .eq("user_id", user?.id)
      .select();
    if (error) {
      console.log("error", error);
    } else {
      console.log("success", data);
    }
  };
  const handleqSix = async (category: string, value: string) => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("users_answers")
      .update({ q_six: value })
      .eq("user_id", user?.id)
      .select();
    if (error) {
      console.log("error", error);
    } else {
      console.log("success", data);
    }
  };
  const handleqSeven = async (category: string, value: string) => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("users_answers")
      .update({ q_seven: value })
      .eq("user_id", user?.id)
      .select();
    if (error) {
      console.log("error", error);
    } else {
      console.log("success", data);
    }
  };
  const handleqEight = async (category: string, value: string) => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("users_answers")
      .update({ q_eight: value })
      .eq("user_id", user?.id)
      .select();
    if (error) {
      console.log("error", error);
    } else {
      console.log("success", data);
    }
  };

  const matchFoodIcon = async (p0: any) => {
    /* const { personality, career } = quizAnswers; */
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("users_answers")
      .select("*")
      .eq("user_id", user?.id);

    /*     const personality = ;
     */ // Extract personality type
    if (!data || data.length === 0) {
      console.log("No data found");
      return;
    }
    const mbtiType = `${data[0].q_one}${data[0].q_two}${data[0].q_three}${data[0].q_four}`;

    const career = {
      environment: data[0].q_five,
      passion: data[0].q_six,
      strength: data[0].q_seven,
      industry: data[0].q_eight
    };
    // Match logic based on MBTI and career preferences
    if (mbtiType.startsWith("ISTJ")) {
      return {
        food: "Bubur Lambuk",
        message: "The Inspector"
      };
    }
    if (mbtiType.startsWith("ISFJ")) {
      return {
        food: "Bubur Lambuk",
        message: "The Defender"
      };
    }
    if (mbtiType.startsWith("INFJ")) {
      return {
        food: "Soya Cincau",
        message: "The Advocate"
      };
    }
    if (mbtiType.startsWith("INTJ")) {
      return {
        food: "Popiah",
        message: "The Mastermind"
      };
    }
    if (mbtiType.startsWith("ISTP")) {
      return {
        food: "Popiah",
        message: "The Virtuoso"
      };
    }
    if (mbtiType.startsWith("ISFP")) {
      return {
        food: "Kuih Lapis",
        message: "The Composer"
      };
    }
    if (mbtiType.startsWith("INFP")) {
      return {
        food: "Kuih Lapis",
        message: "The Mediator"
      };
    }
    if (mbtiType.startsWith("INTP")) {
      return {
        food: "Soya Cincau",
        message: "The Thinker"
      };
    }
    if (mbtiType.startsWith("ESTP")) {
      return {
        food: "Martabak",
        message: "The Entrepreneur"
      };
    }
    if (mbtiType.startsWith("ESFP")) {
      return {
        food: "Air Katira",
        message: "The Entertainer"
      };
    }
    if (mbtiType.startsWith("ENFP")) {
      return {
        food: "Kuih Lapis",
        message: "The Campaigner"
      };
    }
    if (mbtiType.startsWith("ENTP")) {
      return {
        food: "Martabak",
        message: "The Debater"
      };
    }
    if (mbtiType.startsWith("ESTJ")) {
      return {
        food: "Tepung Pelita",
        message: "The Executive"
      };
    }
    if (mbtiType.startsWith("ESFJ")) {
      return {
        food: "Bubur Lambuk",
        message: "The Counselor"
      };
    }
    if (mbtiType.startsWith("ENFJ")) {
      return {
        food: "Soya Cincau",
        message: "The Protagonist"
      };
    }
    if (mbtiType.startsWith("ENTJ")) {
      return {
        food: "Tepung Pelita",
        message: "The Commander"
      };
    }
  };

  const getResults = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("users_answers")
      .select("*")
      .eq("user_id", user?.id);

    if (error) {
      console.log("error", error);
    } else {
      const result = await matchFoodIcon(data[0]); // Get food match
      if (result) {
        const { data, error } = await supabase
          .from("users_answers")
          .update({ icon: result.food })
          .eq("user_id", user?.id)
          .select();

        if (error) {
          console.log("error", error);
        } else {
          console.log("success", data);
          window.location.href = "/email";
        }
      }
    }
  };

  const getResultstwo = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("users_answers")
      .select("*")
      .eq("user_id", user?.id);

    if (error) {
      console.log("error", error);
    } else {
      // Use the improved matching algorithm
      const result = await matchPersonalityToFood(data[0]);

      if (result) {
        const { data, error } = await supabase
          .from("users_answers")
          .update({
            icon: result.food
            /* mbti_type: result.mbtiType,
            mbti_description: result.mbtiDescription,
            food_description: result.description,
            match_score: result.score.toFixed(1) */
          })
          .eq("user_id", user?.id)
          .select();

        if (error) {
          console.log("error", error);
        } else {
          console.log("success", data);
          window.location.href = "/email";
        }
      }
    }
  };

  function calculateDetailedPersonality(answers: any) {
    // Extract base letters and modifiers
    const eiBase = answers.q_one.charAt(0);
    const eiModifier = answers.q_one.length > 1 ? answers.q_one.charAt(1) : "";

    const snBase = answers.q_two.charAt(0);
    const snModifier = answers.q_two.length > 1 ? answers.q_two.charAt(1) : "";

    const tfBase = answers.q_three.charAt(0);
    const tfModifier =
      answers.q_three.length > 1 ? answers.q_three.charAt(1) : "";

    const jpBase = answers.q_four.charAt(0);
    const jpModifier =
      answers.q_four.length > 1 ? answers.q_four.charAt(1) : "";

    // Calculate scores on a scale (1-10) for each dimension
    // Base E/I dimension: E = 1-5, I = 6-10
    let eiScore = eiBase === "E" ? 3 : 8;
    if (eiModifier === "-") eiScore = eiBase === "E" ? 5 : 6; // Move toward center
    if (eiModifier === "+") eiScore = eiBase === "E" ? 1 : 10; // Move toward extreme

    // Base S/N dimension: S = 1-5, N = 6-10
    let snScore = snBase === "S" ? 3 : 8;
    if (snModifier === "-") snScore = snBase === "S" ? 5 : 6; // Move toward center
    if (snModifier === "+") snScore = snBase === "S" ? 1 : 10; // Move toward extreme

    // Base T/F dimension: T = 1-5, F = 6-10
    let tfScore = tfBase === "T" ? 3 : 8;
    if (tfModifier === "-") tfScore = tfBase === "T" ? 5 : 6; // Move toward center
    if (tfModifier === "+") tfScore = tfBase === "T" ? 1 : 10; // Move toward extreme

    // Base J/P dimension: J = 1-5, P = 6-10
    let jpScore = jpBase === "J" ? 3 : 8;
    if (jpModifier === "-") jpScore = jpBase === "J" ? 5 : 6; // Move toward center
    if (jpModifier === "+") jpScore = jpBase === "J" ? 1 : 10; // Move toward extreme

    return {
      eiScore, // Extroversion (low) vs Introversion (high)
      snScore, // Sensing (low) vs Intuition (high)
      tfScore, // Thinking (low) vs Feeling (high)
      jpScore, // Judging (low) vs Perceiving (high)
      mbtiType: `${eiBase}${snBase}${tfBase}${jpBase}` // Base MBTI type
    };
  }

  // Function to calculate career preference scores
  function calculateCareerPreferences(careerAnswers: any) {
    // Environment preferences
    let structureScore = 5; // Default mid-point
    if (careerAnswers.environment === "structured") structureScore = 9;
    else if (careerAnswers.environment === "creative") structureScore = 3;
    else if (careerAnswers.environment === "fast-paced") structureScore = 7;
    else if (careerAnswers.environment === "active") structureScore = 5;

    // Passion preferences - converted to a social orientation score
    let socialScore = 5; // Default mid-point
    if (careerAnswers.passion === "helping") socialScore = 9;
    else if (careerAnswers.passion === "creating") socialScore = 6;
    else if (careerAnswers.passion === "solving") socialScore = 3;
    else if (careerAnswers.passion === "business") socialScore = 7;

    // Strength preferences - converted to a complexity preference
    let complexityScore = 5; // Default mid-point
    if (careerAnswers.strength === "logical") complexityScore = 7;
    else if (careerAnswers.strength === "creativity") complexityScore = 8;
    else if (careerAnswers.strength === "practical") complexityScore = 4;
    else if (careerAnswers.strength === "communication") complexityScore = 6;

    // Industry preferences - used to weight traditional vs modern
    let traditionalScore = 5; // Default mid-point
    if (careerAnswers.industry === "business") traditionalScore = 6;
    else if (careerAnswers.industry === "tech") traditionalScore = 3;
    else if (careerAnswers.industry === "psychology") traditionalScore = 5;
    else if (careerAnswers.industry === "arts") traditionalScore = 4;
    else if (careerAnswers.industry === "engineering") traditionalScore = 7;
    else if (careerAnswers.industry === "education") traditionalScore = 8;
    else if (careerAnswers.industry === "hospitality") traditionalScore = 7;

    return {
      structureScore,
      socialScore,
      complexityScore,
      traditionalScore
    };
  }

  // The main function to match personality to food
  async function matchPersonalityToFood(userData: any) {
    // Get personality scores
    const personality = calculateDetailedPersonality(userData);

    // Get career preference scores
    const career = calculateCareerPreferences({
      environment: userData.q_five,
      passion: userData.q_six,
      strength: userData.q_seven,
      industry: userData.q_eight
    });

    // Calculate compatibility scores for each food
    const foodScores = foodDatabase.map((food) => {
      // Check if this food has a direct MBTI affinity with the user's type
      const mbtiAffinityBonus = food.traits.mbtiAffinities.includes(
        personality.mbtiType
      )
        ? 10
        : 0;

      // Calculate trait compatibility scores

      // Introversion/Extroversion affects social score
      // Low EI (extrovert) matches with high social foods
      const socialCompatibility =
        10 - Math.abs(career.socialScore - food.traits.social);

      // Sensing/Intuition affects complexity score
      // High SN (intuitive) matches with more complex foods
      const complexityCompatibility =
        10 - Math.abs(career.complexityScore - food.traits.complex);

      // Thinking/Feeling affects sweet/savory preference
      // High TF (feeling) matches with sweeter foods
      const sweetCompatibility =
        10 - Math.abs(personality.tfScore - food.traits.sweet);

      // Judging/Perceiving affects preparation score
      // Low JP (judging) matches with more elaborate preparation
      const preparationCompatibility =
        10 - Math.abs(11 - personality.jpScore - food.traits.preparation);

      // Career structure preference affects traditional score
      const traditionalCompatibility =
        10 - Math.abs(career.traditionalScore - food.traits.traditional);

      // Calculate weighted total score
      const totalScore =
        mbtiAffinityBonus * 1.5 + // Direct MBTI match is highly weighted
        socialCompatibility * 1.0 +
        complexityCompatibility * 1.0 +
        sweetCompatibility * 0.8 +
        preparationCompatibility * 0.7 +
        traditionalCompatibility * 0.5;

      return {
        food: food.name,
        description: food.traits.description,
        score: totalScore,
        mbtiType: personality.mbtiType,
        mbtiDescription: getMBTIDescription(personality.mbtiType)
      };
    });

    // Sort foods by score and get the top match
    const sortedFoods = foodScores.sort((a, b) => b.score - a.score);
    return sortedFoods[0]; // Return the best match
  }

  // Helper function to get MBTI descriptions
  function getMBTIDescription(type: string): string {
    const descriptions: { [key: string]: string } = {
      ISTJ: "The Inspector",
      ISFJ: "The Defender",
      INFJ: "The Advocate",
      INTJ: "The Mastermind",
      ISTP: "The Virtuoso",
      ISFP: "The Composer",
      INFP: "The Mediator",
      INTP: "The Thinker",
      ESTP: "The Entrepreneur",
      ESFP: "The Entertainer",
      ENFP: "The Campaigner",
      ENTP: "The Debater",
      ESTJ: "The Executive",
      ESFJ: "The Counselor",
      ENFJ: "The Protagonist",
      ENTJ: "The Commander"
    };

    return descriptions[type] || "The Personality";
  }
  return (
    <div className="relative min-w-96 max-w-md items-center justify-center lg:py-6 max-h-[700px]">
      {showNotification && (
        <div className="bg-transparent dark:bg-slate-800 text-white rounded-3xl p-6 mx-auto w-full overflow-hidden flex flex-col h-[680px] gap-4 justify-between drop-shadow-lg">
          <div className="w-full">
            <Image
              src="/new-logo.png"
              alt="Persona Check Ramadan Edition"
              width={300}
              height={300}
              className="max-w-52 h-auto mx-auto py-4 mb-10"
            />
          </div>
          <div className="flex flex-col gap-4 justify-end">
            <div className="bg-gray-200 text-black rounded-md py-4 px-6 mb-4  text-left mr-12">
              <p>To start the quiz, just type your name and click send!</p>
            </div>
            <div className="flex items-center w-full">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your name..."
                className="flex-1 bg-gray-200 text-black rounded-full py-3 px-6 mr-2  focus:outline-none w-3/4"
              />
              <button
                onClick={handleOpenChat}
                className="bg-orange-300 text-black rounded-full p-3"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {showChat && (
        <div className="bg-transparent dark:bg-slate-800 text-white rounded-3xl p-6 mx-auto w-full overflow-hidden flex flex-col h-[680px] gap-4 justify-between drop-shadow-lg">
          <div className="w-full">
            <Image
              src="/new-logo.png"
              alt="Persona Check Ramadan Edition"
              width={300}
              height={300}
              className="max-w-52 h-auto mx-auto py-4 -mb-4"
            />
          </div>
          <div className="flex flex-col min-h-[520px] overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className="flex flex-col gap-2 justify-between h-full"
              >
                <div
                  className={`${
                    message.sender === "user"
                      ? "bg-emerald-200 border border-emerald-300 text-black ml-12 text-right rounded-br-none"
                      : "bg-stone-200 border border-stone-200 text-black mr-12 text-left text-pretty whitespace-pre-wrap rounded-bl-none"
                  } rounded-xl py-3 px-4 text-sm`}
                >
                  {message.text}
                </div>
                {message.options && (
                  <div className="flex flex-row flex-wrap items-end justify-center gap-4 py-6">
                    {message.options.map((option) => (
                      <Button
                        key={option.value}
                        onClick={option.action}
                        variant={"outline"}
                        className="bg-white text-balance text-black rounded-full py-3 px-4 h-auto text-sm text-center hover:bg-orange-300 hover:drop-shadow-sm transition-colors w-full"
                      >
                        {option.text}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* <div className="flex items-center w-full">
            <input
              type="text"
              value={input}
              disabled
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-gray-200 text-black rounded-full py-3 px-6 mr-2  focus:outline-none w-3/4"
            />
            <button
              onClick={handleSendMessage}
              className="bg-orange-300 text-black rounded-full p-3"
            >
              <Send size={16} />
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
}
