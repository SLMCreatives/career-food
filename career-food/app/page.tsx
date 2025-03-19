import NotificationChatbot from "@/components/chatbot/chatbot";
import StartPage from "@/components/chatbot/start";

export default async function Home() {
  return (
    <>
      <main className="flex flex-col -mt-16 items-center justify-center gap-6 px-4">
        {/*  <NotificationChatbot /> */}
        <StartPage />
      </main>
    </>
  );
}
