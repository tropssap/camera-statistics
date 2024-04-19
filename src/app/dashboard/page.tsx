import Link from "next/link";
import { PointsTable } from "~/components/component/points-table";
import { ScrollArea } from "~/components/ui/scroll-area";
// import { createClient } from "~/server/supabase/supabase";

export default async function HomePage() {
  // const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  return (
    <main className="flex  flex-col items-center justify-center overflow-hidden">
      {/* <Link href={`/dashboard/point/1`} prefetch={true}> */}
      <ScrollArea className="h-screen w-full ">
        <PointsTable />
      </ScrollArea>
    </main>
  );
}
