"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { login } from "./action";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";

export function LoginForm() {
  const { pending } = useFormStatus();
  const [errorMessage, dispatch] = useFormState(login, undefined);
  useEffect(() => {
    if (errorMessage) toast.error("Wrong username or password");
  }, [errorMessage]);
  const handleClick = (event: { preventDefault: () => void }) => {
    if (pending) {
      event.preventDefault();
    }
  };
  return (
    <form className="mx-auto min-w-96 max-w-sm" action={dispatch}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button
              aria-disabled={pending}
              type="submit"
              onClick={handleClick}
              className="w-full"
            >
              Sign In
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Dont have an account yet?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
