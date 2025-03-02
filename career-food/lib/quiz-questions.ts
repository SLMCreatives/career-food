import type { Message } from "./types";

export const introMessage: Message = {
  id: Date.now(),
  text: "Welcome to the most important quiz of your life! (Okay, maybe not the most important, but close enough.)\n\nLet's figure out your personality, ideal career, and—most importantly—the Ramadhan food that defines your soul.\n\nAll you have to do is pick an answer. Easy, right?",
  sender: "bot",
  options: [
    {
      text: "Let's do this!",
      value: "start",
      action: () => {} // Will be set in the component
    },
    {
      text: "Wait, what? Explain more.",
      value: "explain",
      action: () => {} // Will be set in the component
    }
  ]
};

export const explainMessage: Message = {
  id: Date.now(),
  text: "You pick answers, I do all the brain work, and at the end, I tell you your MBTI personality, career match, and your ultimate Ramadhan food twin.\n\nSounds fun, right? Now stop stalling and let's go!",
  sender: "bot",
  options: [
    {
      text: "Okay, okay! Let's start.",
      value: "start",
      action: () => {} // Will be set in the component
    }
  ]
};

export const personalityQuestions = {
  ei: {
    text: "It's the weekend. No school, no exams, no stress (unless your mom suddenly remembers you exist and assigns house chores).\n\nWhat's the plan?",
    options: [
      {
        text: "Party time! Bring on the people!",
        value: "E",
        response:
          "Ahh, a social butterfly! You probably have 20 different WhatsApp groups blowing up at all times."
      },
      {
        text: "Quiet time with my book and tea.",
        value: "I",
        response:
          "Classic introvert move. Just you, your book, and the existential dread of Monday approaching."
      },
      {
        text: "Small group hangout, good vibes only.",
        value: "E-",
        response:
          "Ah, the safe middle ground. Social, but not too social. Balanced. Like a perfectly made teh tarik."
      },
      {
        text: "Solo adventure, just me and the world.",
        value: "I+",
        response:
          "Main character energy. Just don't get lost and end up on a 'Missing Persons' poster, okay?"
      }
    ]
  },
  sn: {
    text: "You're learning something new. What's your approach?",
    options: [
      {
        text: "Step-by-step, detailed instructions.",
        value: "S",
        response:
          "You probably read instruction manuals. Respect. I, on the other hand, would just press buttons until something works."
      },
      {
        text: "Show me a video, let me observe first.",
        value: "S-",
        response: "YouTube University graduate. Got it."
      },
      {
        text: "Just give me the main idea, I'll figure it out.",
        value: "N",
        response:
          "Big brain energy. Why get stuck in details when you can see the grand vision?"
      },
      {
        text: "Jump in and figure it out along the way.",
        value: "N+",
        response:
          "A risk-taker! Just make sure you don't end up with exploded chemistry experiments, yeah?"
      }
    ]
  },
  tf: {
    text: "Your bestie is having a crisis. What's your go-to move?",
    options: [
      {
        text: "Give them logical advice, straight to the point.",
        value: "T",
        response:
          "No nonsense, no sugarcoating. You probably get called 'too blunt' at least once a week."
      },
      {
        text: "Just listen and offer emotional support.",
        value: "F",
        response:
          "The friend everyone cries to. I hope they at least buy you food in return."
      },
      {
        text: "Analyze both sides fairly before advising.",
        value: "T-",
        response:
          "Debater vibes. You probably turn every group discussion into a courtroom session."
      },
      {
        text: "Help them follow their heart, even if it makes no sense.",
        value: "F+",
        response:
          "Ah, the hopeless romantic. Life isn't a K-drama, but I love the energy."
      }
    ]
  },
  jp: {
    text: "You have a big project due next week. How do you handle it?",
    options: [
      {
        text: "Plan everything out, work on it early.",
        value: "J",
        response:
          "You probably highlight your notes in multiple colors. Respect."
      },
      {
        text: "Do some research, but leave room for flexibility.",
        value: "J-",
        response: "A solid mix of strategy and adaptability. Not bad."
      },
      {
        text: "Start last-minute but still finish on time.",
        value: "P-",
        response:
          "Ah, the student life special. Panic + productivity = results."
      },
      {
        text: "Completely wing it and hope for the best.",
        value: "P",
        response: "Do you thrive in chaos, or do you just like suffering?"
      }
    ]
  }
};

export const careerQuestions = {
  environment: {
    text: "In your dream career, what kind of work environment would you prefer?",
    options: [
      {
        text: "Structured, stable, and predictable.",
        value: "structured"
      },
      {
        text: "Creative and flexible, full of new ideas.",
        value: "creative"
      },
      {
        text: "Fast-paced and competitive, high energy.",
        value: "fast-paced"
      },
      {
        text: "Something active, hands-on, and physical.",
        value: "active"
      }
    ]
  },
  passion: {
    text: "If money didn't matter, which kind of job would you pick?",
    options: [
      {
        text: "Helping and guiding others.",
        value: "helping"
      },
      {
        text: "Creating art, stories, or entertainment.",
        value: "creating"
      },
      {
        text: "Solving problems, science and logic.",
        value: "solving"
      },
      {
        text: "Running my own business and making moves.",
        value: "business"
      }
    ]
  },
  strength: {
    text: "What's your biggest strength?",
    options: [
      {
        text: "Logical thinking and strategy.",
        value: "logical"
      },
      {
        text: "Creativity and imagination.",
        value: "creativity"
      },
      {
        text: "Practical, hands-on skills.",
        value: "practical"
      },
      {
        text: "Communication and persuasion.",
        value: "communication"
      }
    ]
  },
  industry: {
    text: "Which industry excites you the most?",
    options: [
      {
        text: "Business & Finance 💼",
        value: "business"
      },
      {
        text: "Tech & IT 💻",
        value: "tech"
      },
      {
        text: "Psychology & Counseling 🧠",
        value: "psychology"
      },
      {
        text: "Arts & Entertainment 🎨",
        value: "arts"
      },
      {
        text: "Engineering & Science 🏗️",
        value: "engineering"
      },
      {
        text: "Education & Social Work 📚",
        value: "education"
      },
      {
        text: "Hospitality & Tourism ✈️",
        value: "hospitality"
      }
    ]
  }
};

export const careerMap: Record<string, Record<string, string>> = {
  INTJ: {
    tech: "Data Scientist or AI Researcher",
    business: "Strategic Consultant",
    engineering: "Systems Architect",
    default: "Strategic Planner or Analyst"
  }
  // ... rest of the career map
};

export const foodMap: Record<string, string> = {
  INTJ: "Dates - Sweet, strategic, and essential for breaking fast",
  ENTJ: "Lamb Biryani - Bold, flavorful, and takes charge of the dinner table",
  INFJ: "Rose Syrup - Thoughtful, sweet, and adds depth to any drink"
  // ... rest of the food map
};
