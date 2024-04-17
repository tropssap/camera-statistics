import { createClient } from "~/server/supabase/supabase";

export default async function HomePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <p>dawdasd</p>
    </main>
  );
}
