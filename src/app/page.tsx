import { createClient } from "~/server/supabase/supabase";
import { SignUpForm } from "./_components/SignUpForm";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error ?? !data?.user) {
    redirect("/login");
  } else {
    redirect("/dashboard");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <SignUpForm />
    </main>
  );
}
