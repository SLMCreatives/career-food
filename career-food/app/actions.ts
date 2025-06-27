"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required"
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`
    }
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/");
};

type UserAnswerRecord = {
  id: string;
  created_at: string;
  user_id: string;
  user_name: string;
  q_one: string;
  q_two: string;
  q_three: string;
  q_four: string;
  q_five: string;
  q_six: string;
  q_seven: string;
  q_eight: string;
  icon: string;
  email: string;
};

/**
 * Server Action to upload records to a specified Supabase table.
 * This function runs on the server and securely interacts with your Supabase database.
 * @param table The name of the Supabase table to insert records into.
 * @param records An array of records to insert.
 * @returns An object indicating success or failure, with a message and data/error details.
 */
export async function uploadRecords(
  table: string,
  records: UserAnswerRecord[]
) {
  try {
    const { data, error } = await supabaseAdmin.from(table).insert(records);

    if (error) {
      console.log("Supabase insert error:", error.message);
      return { success: false, message: error.message };
    }

    return { success: true, data };
  } catch (error: any) {
    console.log("Server action error:", error.message);
    return { success: false, message: error.message };
  }
}

type sgsLeaders = {
  name: string;
  nickname: string;
  referrals: number;
  bounty: number;
  title: string;
  weekly: {
    w1: number;
    w2: number;
    w3: number;
    w4: number;
  };
};

export async function uploadsgsRecords(table: string, records: sgsLeaders[]) {
  try {
    const { data, error } = await supabaseAdmin
      .from(table)
      .upsert(records, { onConflict: "nickname" });

    if (error) {
      console.log("Supabase insert error:", error.message);
      return { success: false, message: error.message };
    }

    return { success: true, data };
  } catch (error: any) {
    console.log("Server action error:", error.message);
    return { success: false, message: error.message };
  }
}
