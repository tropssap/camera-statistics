"use client";

import { type User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from "~/components/ui/tooltip";

function LogoutButton(props: { user: User }) {
  const router = useRouter();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Avatar
            className="cursor-pointer bg-slate-700"
            onClick={async () => {
              try {
                const response = await fetch("/api/auth/signout", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                });

                if (!response.ok) {
                  throw new Error(
                    response.statusText || "An error occurred during logout",
                  );
                }
                router.push("/login");
              } catch (error) {
                console.error("Logout error:", error);
              }
            }}
          >
            <AvatarFallback>{props.user.email?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          <p>Log out</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default LogoutButton;
