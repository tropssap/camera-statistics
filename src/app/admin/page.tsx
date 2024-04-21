import { Suspense } from "react";
import { PointsTable } from "~/components/component/points-table";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Skeleton } from "~/components/ui/skeleton";

function Page() {
  return (
    <main className="flex  flex-col items-center justify-center overflow-hidden">
      <ScrollArea className="h-screen w-full p-4">
        <Suspense
          fallback={
            <Skeleton className="m-10  min-h-screen rounded-md sm:px-7" />
          }
        >
          <PointsTable path="/admin/point" isAdd={false} />
        </Suspense>
      </ScrollArea>
    </main>
  );
}

export default Page;
