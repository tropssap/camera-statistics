"use server";

import { jwtDecode } from "jwt-decode";
import { type NextRequest } from "next/server";
import { createClient } from "~/server/supabase/supabase";

export async function getUserRole() {
  const supabase = createClient();
  await supabase.auth.getUser();
  const { data: session } = await supabase.auth.getSession();
  if (session) {
    const jwt = jwtDecode<{ user_role: string }>(
      session.session?.access_token ?? "",
    );
    return jwt.user_role;
  } else {
    return null;
  }
}
