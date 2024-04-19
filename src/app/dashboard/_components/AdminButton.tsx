"use client";

import { Button } from "~/components/ui/button";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { createClient } from "~/app/utils/supabase/client";

export default function AdminButton() {
  const supabase = createClient();
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        const jwt = jwtDecode<{ user_role: string }>(session.access_token);
        console.log(jwt.user_role);
        setUserRole(jwt.user_role);
      }
    });
  }, [supabase.auth]);
  return (
    <>{userRole === "admin" && <Button variant="secondary">Admin</Button>}</>
  );
}
