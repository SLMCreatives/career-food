export type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  options?: Option[];
};

export type Option = {
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
