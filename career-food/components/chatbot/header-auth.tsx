import { createClient } from "@/utils/supabase/server";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = await createClient();

  const viewResults = async () => {
    redirect("/results");
  };

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <>
        <p>Hello</p>
      </>
    );
  }
  return (
    user.id && (
      <div className="flex items-center gap-4">
        <Button onClick={viewResults} variant={"outline"}>
          View Results
        </Button>
      </div>
    )
  );
}
