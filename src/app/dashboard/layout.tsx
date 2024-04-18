import { redirect } from "next/navigation";
import { createClient } from "~/server/supabase/supabase";
import Header from "./_components/Header";

export const metadata = {
  title: "Camera Statistics",
  description: "Developer for diploma",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error ?? !data?.user) {
    redirect("/login");
  }

  return (
    <div className="grid h-screen grid-rows-[auto,1fr]">
      <Header user={data?.user} />
      {children}
      {modal}
    </div>
  );
}
