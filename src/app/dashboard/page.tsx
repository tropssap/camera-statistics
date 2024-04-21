import { Suspense } from "react";
import { PointsTable } from "~/components/component/points-table";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Skeleton } from "~/components/ui/skeleton";

export default async function HomePage() {
  return (
    <main className="flex  flex-col items-center justify-center overflow-hidden">
      {/* <Link href={`/dashboard/point/1`} prefetch={true}> */}
      <ScrollArea className="h-screen w-full ">
        <Suspense
          fallback={
            <Skeleton className="m-10  min-h-screen rounded-md sm:px-7" />
          }
        >
          <PointsTable path="/dashboard/point" isAdd={true} />
        </Suspense>
      </ScrollArea>
    </main>
  );
}
