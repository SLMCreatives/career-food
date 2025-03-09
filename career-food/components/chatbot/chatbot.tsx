"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

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

  console.log(quizAnswers);

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
      startQuiz();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showChat]);

  useEffect(() => {
    if (hitstart) {
      hitStart();
    }
  }, [hitstart]);

  const preQuiz = () => {
    const preQuizMessage: Message = {
      id: Date.now(),
      text: "👋 Hello! I'm your friendly CareerBot. What's your name?",
      sender: "bot"
    };
    startQuiz();
    setMessages([preQuizMessage]);
  };

  const hitStart = () => {
    const intro: Message = {
      id: Date.now(),
      text: "In todays faced paced world...bla bla bla",
      sender: "bot"
    };
    setMessages([intro]);
  };

  const startQuiz = () => {
    const introMessage: Message = {
      id: Date.now(),
      text: `Welcome ${name} to the most important quiz of your life! (Okay, maybe not the most important, but close enough.)\n\nLet's figure out your personality, ideal career, and—most importantly—the Ramadhan food that defines your soul.\n\nAll you have to do is pick an answer. Easy, right?`,
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
      text: "You pick answers, I do all the brain work, and at the end, I tell you your MBTI personality, career match, and your ultimate Ramadhan food twin.\n\nSounds fun, right? Now stop stalling and let's go!",
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
          action: () => {}
        },
        {
          text: "Small group hangout, good vibes only.",
          value: "E-",
          action: () => {}
        },
        {
          text: "Solo adventure, just me and the world.",
          value: "I+",
          action: () => {}
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
      setQuizAnswers((prev) => ({
        ...prev,
        personality: { ...prev.personality, ei: value }
      }));
      setTimeout(() => askSensingIntuitionQuestion(), 2000);
    } else if (category === "sn") {
      setQuizAnswers((prev) => ({
        ...prev,
        personality: { ...prev.personality, sn: value }
      }));
      setTimeout(() => askThinkingFeelingQuestion(), 2000);
    } else if (category === "tf") {
      setQuizAnswers((prev) => ({
        ...prev,
        personality: { ...prev.personality, tf: value }
      }));
      setTimeout(() => askJudgingPerceivingQuestion(), 2000);
    } else if (category === "jp") {
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
      text: "Your bestie is having a crisis. What's your go-to move?",
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
      text: "You have a big project due next week. How do you handle it?",
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
      text: "In your dream career, what kind of work environment would you prefer?",
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
      setQuizAnswers((prev) => ({
        ...prev,
        career: { ...prev.career, environment: value }
      }));
      setTimeout(() => askPassionQuestion(), 2000);
    } else if (category === "passion") {
      setQuizAnswers((prev) => ({
        ...prev,
        career: { ...prev.career, passion: value }
      }));
      setTimeout(() => askStrengthQuestion(), 2000);
    } else if (category === "strength") {
      setQuizAnswers((prev) => ({
        ...prev,
        career: { ...prev.career, strength: value }
      }));
      setTimeout(() => askIndustryQuestion(), 2000);
    } else if (category === "industry") {
      setQuizAnswers((prev) => ({
        ...prev,
        career: { ...prev.career, industry: value }
      }));
      setTimeout(() => submitResults(), 2000);
    }
  };

  const askSubmitResults = () => {
    const resultsQuestion: Message = {
      id: Date.now(),
      text: "Ready to see your results?",
      sender: "bot",
      options: [
        {
          text: "Submit my the results!",
          value: "results",
          action: () => submitResults()
        }
      ]
    };
    setMessages((prev) => [...prev, resultsQuestion]);
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

  const showResults = () => {
    setQuizStage("results");

    // Determine MBTI type
    const mbtiType = determineMBTI();

    // Determine career path
    const careerPath = determineCareer();

    // Determine Ramadhan food
    const ramadhanFood = determineRamadhanFood(mbtiType);

    const resultsMessage: Message = {
      id: Date.now(),
      text: `🎉 Results are in! 🎉\n\n🧠 Your MBTI Personality Type: ${mbtiType}\n\n💼 Your Ideal Career Path: ${careerPath}\n\n🍽️ Your Ramadhan Food Soul Match: ${ramadhanFood}\n\nWant to know which course you should take?`,
      sender: "bot",
      options: [
        {
          text: "Take the quiz again!",
          value: "restart",
          action: () => {
            setQuizStage("intro");
            setQuizAnswers({
              personality: { ei: "", sn: "", tf: "", jp: "" },
              career: {
                environment: "",
                passion: "",
                strength: "",
                industry: ""
              }
            });
            startQuiz();
          }
        },
        {
          text: "Share with friends",
          value: "share",
          action: () => {
            navigator.share({
              title: "CareerFood",
              text: "Check out CareerFood! A fun quiz to find your ideal career and Ramadhan food.",
              url: window.location.href
            });
          }
        }
      ]
    };
    setMessages((prev) => [...prev, resultsMessage]);
  };

  const determineMBTI = () => {
    const { ei, sn, tf, jp } = quizAnswers.personality;

    const e_i = ei.startsWith("E") ? "E" : "I";
    const s_n = sn.startsWith("S") ? "S" : "N";
    const t_f = tf.startsWith("T") ? "T" : "F";
    const j_p = jp.startsWith("J") ? "J" : "P";

    return `${e_i}${s_n}${t_f}${j_p}`;
  };

  const determineCareer = () => {
    const mbti = determineMBTI();
    const { environment, passion, industry } = quizAnswers.career;

    // This is a simplified mapping - in a real app, you'd have more complex logic
    const careerMap: Record<string, Record<string, string>> = {
      INTJ: {
        tech: "Data Scientist or AI Researcher",
        business: "Strategic Consultant",
        engineering: "Systems Architect",
        default: "Strategic Planner or Analyst"
      },
      ENTJ: {
        business: "CEO or Executive",
        tech: "Tech Startup Founder",
        default: "Business Leader or Manager"
      },
      INFJ: {
        psychology: "Therapist or Counselor",
        education: "Teacher or Professor",
        arts: "Writer or Content Creator",
        default: "Counselor or Coach"
      },
      ENFJ: {
        education: "School Principal",
        psychology: "Motivational Speaker",
        default: "Team Leader or HR Manager"
      },
      INFP: {
        arts: "Writer or Artist",
        psychology: "Counselor",
        default: "Creative Writer or Designer"
      },
      ENFP: {
        arts: "Performer or Creative Director",
        psychology: "Life Coach",
        default: "Creative Consultant or Entrepreneur"
      },
      INTP: {
        tech: "Software Developer",
        engineering: "Research Scientist",
        default: "Researcher or Analyst"
      },
      ENTP: {
        business: "Entrepreneur",
        tech: "Innovation Consultant",
        default: "Entrepreneur or Consultant"
      },
      ISTJ: {
        business: "Financial Analyst",
        engineering: "Civil Engineer",
        default: "Project Manager or Accountant"
      },
      ESTJ: {
        business: "Business Administrator",
        default: "Manager or Administrator"
      },
      ISFJ: {
        education: "Elementary Teacher",
        hospitality: "Hotel Manager",
        default: "Administrative Assistant or Nurse"
      },
      ESFJ: {
        hospitality: "Event Planner",
        education: "School Counselor",
        default: "HR Specialist or Community Manager"
      },
      ISTP: {
        engineering: "Mechanical Engineer",
        tech: "Systems Administrator",
        default: "Technical Specialist or Craftsperson"
      },
      ESTP: {
        business: "Sales Representative",
        hospitality: "Tour Guide",
        default: "Entrepreneur or Sales Professional"
      },
      ISFP: {
        arts: "Graphic Designer",
        hospitality: "Chef",
        default: "Designer or Artist"
      },
      ESFP: {
        arts: "Performer",
        hospitality: "Travel Agent",
        default: "Event Coordinator or Entertainer"
      }
    };

    // Default career if specific mapping not found
    let career = "Professional with strong analytical and creative skills";

    if (careerMap[mbti]) {
      if (careerMap[mbti][industry]) {
        career = careerMap[mbti][industry];
      } else {
        career = careerMap[mbti]["default"];
      }
    }

    return career;
  };

  const determineRamadhanFood = (mbtiType: string) => {
    // Map MBTI types to Ramadhan foods
    const foodMap: Record<string, string> = {
      INTJ: "Dates - Sweet, strategic, and essential for breaking fast",
      ENTJ: "Lamb Biryani - Bold, flavorful, and takes charge of the dinner table",
      INFJ: "Rose Syrup - Thoughtful, sweet, and adds depth to any drink",
      ENFJ: "Samosas - Brings everyone together and makes the party happen",
      INFP: "Baklava - Layered, sweet, and surprisingly complex",
      ENFP: "Fruit Chaat - Colorful, exciting, and full of surprises",
      INTP: "Plain Roti - Simple but essential, with hidden complexity",
      ENTP: "Falooda - Creative, colorful, and never boring",
      ISTJ: "Plain Rice - Reliable, consistent, and goes with everything",
      ESTJ: "Kebabs - Structured, organized, and gets the job done",
      ISFJ: "Chicken Soup - Nurturing, comforting, and takes care of everyone",
      ESFJ: "Iftar Platter - Organized, generous, and makes sure everyone is fed",
      ISTP: "Grilled Meat - Practical, straightforward, and satisfying",
      ESTP: "Spicy Biryani - Bold, adventurous, and lives in the moment",
      ISFP: "Sheer Khurma - Artistic, delicate, and aesthetically pleasing",
      ESFP: "Jalebi - Sweet, fun, and the life of the party"
    };

    return (
      foodMap[mbtiType] ||
      "Special Ramadhan Mix - A unique blend just like you!"
    );
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

  const submitResults = async () => {
    console.log(quizAnswers);
    /* const {
      data: { user }
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("users_answers")
      .update({
        personality: quizAnswers.personality,
        career: quizAnswers.career
      })
      .eq("user_id", user?.id)
      .select();
    if (error) {
      console.log("error submitting results", error);
    } else {
      console.log("success submit results", data);
    } */
  };

  const handleIgnore = () => {
    setShowNotification(false);
  };

  return (
    <div className="relative min-w-96 max-w-md">
      {showNotification && (
        <div className="bg-black border-2 border-stone-950 shadow-lg dark:bg-slate-800 text-white rounded-3xl p-6 mx-auto w-full overflow-hidden text-sm flex flex-col h-[700px]">
          <div className="text-center mb-auto font-bold text-xl pb-4">
            👷 Persona Check
          </div>

          <div className="bg-gray-200 text-black rounded-md py-4 px-6 mb-4  text-left mr-12">
            <p>To start the quiz, just type your name and click send!</p>
          </div>

          {/* <button
            onClick={handleOpenChat}
            className="bg-pink-200 text-black rounded-full py-3 px-6 mb-3 hover:font-bold hover:bg-pink-400 transition-colors duration-300 ease-in-out"
            >
            *Start Quiz*
          </button> */}
          <div className="flex items-center w-full">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your name to begin quiz"
              className="flex-1 bg-gray-200 text-black rounded-full py-3 px-6 mr-2  focus:outline-none w-3/4"
            />
            <button
              onClick={handleOpenChat}
              className="bg-pink-200 text-black rounded-full p-3"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {showChat && (
        <div className="bg-black dark:bg-slate-800 text-white rounded-3xl p-6 mx-auto w-full overflow-hidden flex flex-col h-[700px]">
          <div className="text-center mb-auto font-bold text-xl pb-4">
            👷 Persona Check
          </div>
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                <div
                  className={`${
                    message.sender === "user"
                      ? "bg-emerald-200 text-black ml-12 text-right"
                      : "bg-gray-200 text-black mr-12"
                  } rounded-md py-3 px-4 text-md whitespace-pre-wrap text-pretty`}
                >
                  {message.text}
                </div>
                {message.options && (
                  <div className="flex flex-col items-end justify-center gap-4 py-6">
                    {message.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={option.action}
                        className="bg-pink-200 text-black rounded-full py-3 px-4 text-sm text-right hover:bg-pink-400 transition-colors"
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center w-full">
            <input
              type="text"
              value={input}
              disabled
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 bg-gray-200 text-black rounded-full py-3 px-6 mr-2  focus:outline-none w-3/4"
            />
            <button
              onClick={handleSendMessage}
              className="bg-pink-200 text-black rounded-full p-3"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
