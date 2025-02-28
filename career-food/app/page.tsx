import NotificationChatbot from "@/components/chatbot/chatbot";

export default async function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col items-center justify-center gap-6 px-4">
        <NotificationChatbot />
        <div className="absolute bottom-10 text-xs text-center w-full text-gray-700">
          all artwork is copyrighted, please don&apos;t use it without
          permission
          <br />© 2025
        </div>
      </main>
    </>
  );
}
