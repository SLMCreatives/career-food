import NotificationChatbot from "@/components/chatbot/chatbot";
import StartPage from "@/components/chatbot/start";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default async function Home() {
  return (
    <>
      <main className="flex flex-col -mt-16 items-center bg-background justify-center gap-6 px-4">
        {/*  <NotificationChatbot /> */}
        <div className="absolute top-2 right-2 z-50">
          <ThemeSwitcher />
        </div>
        <StartPage />
      </main>
    </>
  );
}
