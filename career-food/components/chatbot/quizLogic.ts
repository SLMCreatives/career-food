import { Message, QuizAnswers } from "./chatbot";

export const determineMBTI = (quizAnswers: QuizAnswers) => {
  const { ei, sn, tf, jp } = quizAnswers.personality;

  const e_i = ei.startsWith("E") ? "E" : "I";
  const s_n = sn.startsWith("S") ? "S" : "N";
  const t_f = tf.startsWith("T") ? "T" : "F";
  const j_p = jp.startsWith("J") ? "J" : "P";

  return `${e_i}${s_n}${t_f}${j_p}`;
};

export const determineCareer = (quizAnswers: QuizAnswers) => {
  const mbti = determineMBTI(quizAnswers);
  const { environment, passion, strength, industry } = quizAnswers.career;

  const careerMap: Record<
    string,
    Record<string, Record<string, Record<string, string>>>
  > = {
    INTJ: {
      tech: {
        logical: {
          structured: "Data Scientist",
          creative: "AI Researcher",
          default: "Systems Architect"
        },
        creativity: {
          structured: "Software Engineer",
          creative: "Tech Innovator",
          default: "Product Manager"
        },
        default: {
          structured: "IT Consultant",
          creative: "Tech Strategist",
          default: "Tech Analyst"
        }
      },
      business: {
        logical: {
          structured: "Strategic Consultant",
          creative: "Business Analyst",
          default: "Operations Manager"
        },
        creativity: {
          structured: "Marketing Strategist",
          creative: "Business Innovator",
          default: "Product Manager"
        },
        default: {
          structured: "Financial Analyst",
          creative: "Business Developer",
          default: "Business Planner"
        }
      },
      default: {
        default: {
          default: "Strategic Planner or Analyst"
        }
      }
    },
    ENTJ: {
      business: {
        logical: {
          structured: "CEO or Executive",
          creative: "Business Leader",
          default: "Operations Manager"
        },
        creativity: {
          structured: "Marketing Director",
          creative: "Business Innovator",
          default: "Product Manager"
        },
        default: {
          structured: "Financial Analyst",
          creative: "Business Developer",
          default: "Business Planner"
        }
      },
      tech: {
        logical: {
          structured: "Tech Startup Founder",
          creative: "Tech Innovator",
          default: "Product Manager"
        },
        default: {
          structured: "IT Consultant",
          creative: "Tech Strategist",
          default: "Tech Analyst"
        }
      },
      default: {
        default: {
          default: "Business Leader or Manager"
        }
      }
    },
    INFJ: {
      psychology: {
        logical: {
          structured: "Therapist",
          creative: "Counselor",
          default: "Psychologist"
        },
        default: {
          structured: "Clinical Psychologist",
          creative: "Life Coach",
          default: "Counselor"
        }
      },
      education: {
        logical: {
          structured: "Teacher",
          creative: "Professor",
          default: "Educator"
        },
        default: {
          structured: "School Counselor",
          creative: "Educational Consultant",
          default: "Teacher"
        }
      },
      arts: {
        logical: {
          structured: "Writer",
          creative: "Content Creator",
          default: "Author"
        },
        default: {
          structured: "Journalist",
          creative: "Creative Writer",
          default: "Content Creator"
        }
      },
      default: {
        default: {
          default: "Counselor or Coach"
        }
      }
    },
    ENFJ: {
      education: {
        logical: {
          structured: "School Principal",
          creative: "Educational Leader",
          default: "Teacher"
        },
        default: {
          structured: "School Counselor",
          creative: "Educational Consultant",
          default: "Teacher"
        }
      },
      psychology: {
        logical: {
          structured: "Motivational Speaker",
          creative: "Life Coach",
          default: "Counselor"
        },
        default: {
          structured: "Therapist",
          creative: "Psychologist",
          default: "Counselor"
        }
      },
      default: {
        default: {
          default: "Team Leader or HR Manager"
        }
      }
    },
    INFP: {
      arts: {
        logical: {
          structured: "Writer",
          creative: "Artist",
          default: "Author"
        },
        default: {
          structured: "Journalist",
          creative: "Creative Writer",
          default: "Content Creator"
        }
      },
      psychology: {
        logical: {
          structured: "Counselor",
          creative: "Therapist",
          default: "Psychologist"
        },
        default: {
          structured: "Life Coach",
          creative: "Clinical Psychologist",
          default: "Counselor"
        }
      },
      default: {
        default: {
          default: "Creative Writer or Designer"
        }
      }
    },
    ENFP: {
      arts: {
        logical: {
          structured: "Performer",
          creative: "Creative Director",
          default: "Artist"
        },
        default: {
          structured: "Journalist",
          creative: "Creative Writer",
          default: "Content Creator"
        }
      },
      psychology: {
        logical: {
          structured: "Life Coach",
          creative: "Therapist",
          default: "Psychologist"
        },
        default: {
          structured: "Counselor",
          creative: "Clinical Psychologist",
          default: "Counselor"
        }
      },
      default: {
        default: {
          default: "Creative Consultant or Entrepreneur"
        }
      }
    },
    INTP: {
      tech: {
        logical: {
          structured: "Software Developer",
          creative: "Tech Innovator",
          default: "Systems Architect"
        },
        default: {
          structured: "IT Consultant",
          creative: "Tech Strategist",
          default: "Tech Analyst"
        }
      },
      engineering: {
        logical: {
          structured: "Research Scientist",
          creative: "Engineer",
          default: "Systems Architect"
        },
        default: {
          structured: "Mechanical Engineer",
          creative: "Civil Engineer",
          default: "Research Scientist"
        }
      },
      default: {
        default: {
          default: "Researcher or Analyst"
        }
      }
    },
    ENTP: {
      business: {
        logical: {
          structured: "Entrepreneur",
          creative: "Business Innovator",
          default: "Business Leader"
        },
        default: {
          structured: "Marketing Strategist",
          creative: "Product Manager",
          default: "Business Developer"
        }
      },
      tech: {
        logical: {
          structured: "Innovation Consultant",
          creative: "Tech Innovator",
          default: "Product Manager"
        },
        default: {
          structured: "IT Consultant",
          creative: "Tech Strategist",
          default: "Tech Analyst"
        }
      },
      default: {
        default: {
          default: "Entrepreneur or Consultant"
        }
      }
    },
    ISTJ: {
      business: {
        logical: {
          structured: "Financial Analyst",
          creative: "Business Analyst",
          default: "Operations Manager"
        },
        default: {
          structured: "Accountant",
          creative: "Business Developer",
          default: "Project Manager"
        }
      },
      engineering: {
        logical: {
          structured: "Civil Engineer",
          creative: "Mechanical Engineer",
          default: "Systems Architect"
        },
        default: {
          structured: "Research Scientist",
          creative: "Engineer",
          default: "Systems Architect"
        }
      },
      default: {
        default: {
          default: "Project Manager or Accountant"
        }
      }
    },
    ESTJ: {
      business: {
        logical: {
          structured: "Business Administrator",
          creative: "Operations Manager",
          default: "CEO"
        },
        default: {
          structured: "Financial Analyst",
          creative: "Business Developer",
          default: "Project Manager"
        }
      },
      default: {
        default: {
          default: "Manager or Administrator"
        }
      }
    },
    ISFJ: {
      education: {
        logical: {
          structured: "Elementary Teacher",
          creative: "Educational Consultant",
          default: "Teacher"
        },
        default: {
          structured: "School Counselor",
          creative: "Educational Leader",
          default: "Teacher"
        }
      },
      hospitality: {
        logical: {
          structured: "Hotel Manager",
          creative: "Event Planner",
          default: "Hospitality Manager"
        },
        default: {
          structured: "Travel Agent",
          creative: "Tour Guide",
          default: "Event Coordinator"
        }
      },
      default: {
        default: {
          default: "Administrative Assistant or Nurse"
        }
      }
    },
    ESFJ: {
      hospitality: {
        logical: {
          structured: "Event Planner",
          creative: "Hospitality Manager",
          default: "Hotel Manager"
        },
        default: {
          structured: "Travel Agent",
          creative: "Tour Guide",
          default: "Event Coordinator"
        }
      },
      education: {
        logical: {
          structured: "School Counselor",
          creative: "Educational Consultant",
          default: "Teacher"
        },
        default: {
          structured: "Elementary Teacher",
          creative: "Educational Leader",
          default: "Teacher"
        }
      },
      default: {
        default: {
          default: "HR Specialist or Community Manager"
        }
      }
    },
    ISTP: {
      engineering: {
        logical: {
          structured: "Mechanical Engineer",
          creative: "Civil Engineer",
          default: "Systems Architect"
        },
        default: {
          structured: "Research Scientist",
          creative: "Engineer",
          default: "Systems Architect"
        }
      },
      tech: {
        logical: {
          structured: "Systems Administrator",
          creative: "Tech Innovator",
          default: "Product Manager"
        },
        default: {
          structured: "IT Consultant",
          creative: "Tech Strategist",
          default: "Tech Analyst"
        }
      },
      default: {
        default: {
          default: "Technical Specialist or Craftsperson"
        }
      }
    },
    ESTP: {
      business: {
        logical: {
          structured: "Sales Representative",
          creative: "Marketing Strategist",
          default: "Business Developer"
        },
        default: {
          structured: "Entrepreneur",
          creative: "Business Innovator",
          default: "Product Manager"
        }
      },
      hospitality: {
        logical: {
          structured: "Tour Guide",
          creative: "Event Planner",
          default: "Hospitality Manager"
        },
        default: {
          structured: "Travel Agent",
          creative: "Tour Guide",
          default: "Event Coordinator"
        }
      },
      default: {
        default: {
          default: "Entrepreneur or Sales Professional"
        }
      }
    },
    ISFP: {
      arts: {
        logical: {
          structured: "Graphic Designer",
          creative: "Artist",
          default: "Creative Director"
        },
        default: {
          structured: "Journalist",
          creative: "Creative Writer",
          default: "Content Creator"
        }
      },
      hospitality: {
        logical: {
          structured: "Chef",
          creative: "Event Planner",
          default: "Hospitality Manager"
        },
        default: {
          structured: "Travel Agent",
          creative: "Tour Guide",
          default: "Event Coordinator"
        }
      },
      default: {
        default: {
          default: "Designer or Artist"
        }
      }
    },
    ESFP: {
      arts: {
        logical: {
          structured: "Performer",
          creative: "Creative Director",
          default: "Artist"
        },
        default: {
          structured: "Journalist",
          creative: "Creative Writer",
          default: "Content Creator"
        }
      },
      hospitality: {
        logical: {
          structured: "Travel Agent",
          creative: "Event Planner",
          default: "Hospitality Manager"
        },
        default: {
          structured: "Tour Guide",
          creative: "Event Coordinator",
          default: "Event Planner"
        }
      },
      default: {
        default: {
          default: "Event Coordinator or Entertainer"
        }
      }
    }
  };

  let career = "Professional with strong analytical and creative skills";

  if (careerMap[mbti]) {
    if (careerMap[mbti][industry]) {
      if (careerMap[mbti][industry][strength]) {
        if (careerMap[mbti][industry][strength][environment]) {
          career = careerMap[mbti][industry][strength][environment];
        } else {
          career = careerMap[mbti][industry][strength]["default"];
        }
      } else {
        career = careerMap[mbti][industry]["default"]["default"];
      }
    } else {
      career = careerMap[mbti]["default"]["default"]["default"];
    }
  }

  return career;
};

export const determineRamadhanFood = (mbtiType: string) => {
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
    foodMap[mbtiType] || "Special Ramadhan Mix - A unique blend just like you!"
  );
};
