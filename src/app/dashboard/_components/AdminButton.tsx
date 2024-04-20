"use client";

import { Button } from "~/components/ui/button";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { createClient } from "~/lib/utils/supabase/client";

export default function AdminButton() {
  const supabase = createClient();
  const [userRole, setUserRole] = useState("");
  const pathname = usePathname();
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        const jwt = jwtDecode<{ user_role: string }>(session.access_token);
        setUserRole(jwt.user_role);
      }
    });
  }, [supabase.auth]);
  return (
    <>
      {userRole === "admin" &&
        (pathname.startsWith("/admin") ? (
          <Button asChild variant="secondary">
            <Link href="/dashboard">User</Link>
          </Button>
        ) : (
          <Button asChild variant="secondary">
            <Link href="/admin">Admin</Link>
          </Button>
        ))}
    </>
  );
}
