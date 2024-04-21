import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { type Json } from "~/types/supabase";

export async function PointPreview({
  point,
  cameras,
}: {
  point: {
    camera_count: number;
    created_at: string;
    floor_plan_url: string | null;
    id: number;
    json: Json;
    name: string | null;
    restart: boolean;
    status: string;
    user_id: string | null;
  };
  cameras: {
    created_at: string;
    id: number;
    name: string | null;
    point_id: number | null;
    processed: boolean;
    url: string | null;
  }[];
}) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Point {point.name}</CardTitle>
        <CardDescription>
          <Image
            alt="gloor_plan"
            src={point.floor_plan_url ?? "/placeholder.png"}
            width={400}
            height={300}
          />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {cameras?.map((camera) => (
          <div
            className="flex h-5 items-center space-x-4 text-sm"
            key={camera.id}
          >
            <p>{camera.name}</p>
            <Separator orientation="vertical" />
            <p>{camera.url}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
