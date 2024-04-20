import { Suspense } from "react";
import { JsonInput } from "~/components/component/json-input";
import { PointsTable } from "~/components/component/points-table";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Skeleton } from "~/components/ui/skeleton";

function Page() {
  return (
    <main className="flex  flex-col items-center justify-center overflow-hidden">
      {/* <Link href={`/dashboard/point/1`} prefetch={true}> */}
      <ScrollArea className="h-screen w-full p-4">
        <Suspense
          fallback={
            <Skeleton className="m-10  min-h-screen rounded-md sm:px-7" />
          }
        >
          {/* <PointsTable /> */}
          <JsonInput />
        </Suspense>
      </ScrollArea>
    </main>
  );
}

export default Page;
