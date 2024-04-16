import { redirect } from "next/navigation";
import { createClient } from "~/server/supabase/supabase";

export const metadata = {
  title: "Camera Statistics",
  description: "Developer for diploma",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error ?? !data?.user) {
    redirect("/login");
  }

  return children;
}
