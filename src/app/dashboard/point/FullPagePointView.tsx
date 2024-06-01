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

  const { data } = await supabase
    .from("statistics")
    .select("*")
    .eq("point_id", idAsNumber);
  if (!data) throw new Error("No statistics data found");
  const chartData = data.filter((stat) => stat.type === "cn_chart");
  const heatData = data.filter((stat) => stat.type === "heatmap");
  const heatMap = heatData[0]?.data as { impath: string };

  return (
    <div className=" max-w-screen grid h-full min-w-0  grid-cols-2 gap-x-4 gap-y-4 overflow-hidden text-white">
      <div className="flex  items-start justify-center">
        <Image
          src={heatMap.impath ?? "/placeholder.svg"}
          width={500}
          height={500}
          alt="Floor Plan"
        />
      </div>
      <div className=" flex  max-h-96 items-center justify-center">
        {chartData.length > 0 && chartData[0]?.data && (
          <ChartPerTimestamp
            data={
              chartData[0]?.data as {
                timestamp: string | number;
                y: number;
              }[]
            }
          />
        )}
      </div>
    </div>
  );
}
