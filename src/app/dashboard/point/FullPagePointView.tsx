import { createClient } from "~/server/supabase/supabase";
import { ChartPerTimestamp } from "./_components/ChartPerTimestamp";
import { rawData } from "./data";
import Image from "next/image";

export async function FullPagePointView(props: { id: string }) {
  const idAsNumber = Number(props.id);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid id");
  const supabase = createClient();
  await supabase.auth.getUser();
  const { data: point } = await supabase
    .from("points")
    .select()
    .eq("id", idAsNumber);
  if (!point) throw new Error("No point found");

  const data = rawData;

  return (
    <div className=" max-w-screen grid h-full min-w-0  grid-cols-2 gap-x-4 gap-y-4 overflow-hidden text-white">
      <div className="flex  items-start justify-center">
        <Image
          src={point[0]?.floor_plan_url ?? "/placeholder.svg"}
          width={500}
          height={500}
          alt="Floor Plan"
        />
      </div>
      <div className=" flex  max-h-96 items-center justify-center">
        <ChartPerTimestamp data={data} />
      </div>
    </div>
  );
}
