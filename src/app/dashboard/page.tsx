
import { PointsTable } from "~/components/component/points-table";
import { ScrollArea } from "~/components/ui/scroll-area";

export default async function HomePage() {

  return (
    <main className="flex  flex-col items-center justify-center overflow-hidden">
      {/* <Link href={`/dashboard/point/1`} prefetch={true}> */}
      <ScrollArea className="h-screen w-full ">
        <PointsTable />
      </ScrollArea>
    </main>
  );
}
