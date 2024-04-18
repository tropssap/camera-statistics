import Link from "next/link";
import { createClient } from "~/server/supabase/supabase";

export default async function HomePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="flex  flex-col items-center justify-center ">
      <Link href={`/dashboard/point/1`}>
        <p>dawdasd</p>
      </Link>
    </main>
  );
}
