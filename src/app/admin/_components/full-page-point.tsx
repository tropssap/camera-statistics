import { createClient } from "~/server/supabase/supabase";
import { PointPreview } from "./point-preview";
import { JsonInput } from "./json-input";

export type CameraObject = Record<
  number,
  {
    cam_id: number;
    cam_link: string;
    homography_matrix: (number | string)[] | [number, number, number][];
    ground_polygon: string;
  }
>;

export async function FullPagePoint(props: { id: string }) {
  const idAsNumber = Number(props.id);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid id");
  const supabase = createClient();
  await supabase.auth.getUser();
  const { data: points } = await supabase
    .from("points")
    .select()
    .eq("id", idAsNumber)
    .limit(1);
  if (points) {
    const point = points[0];
    if (point) {
      const { data: cameras } = await supabase
        .from("cameras")
        .select()
        .eq("point_id", point.id);
      if (cameras) {
        const initialValues: CameraObject = cameras.reduce((obj, camera) => {
          obj[camera.id] = {
            cam_id: camera.id,
            cam_link: camera.url!,
            homography_matrix: Array<number | string>(9).fill(""),
            ground_polygon: "",
          };
          return obj;
        }, {} as CameraObject);
        return (
          <div className="flex flex-row gap-10 p-10 ">
            <JsonInput
              point={point}
              cameras={cameras}
              initialValues={initialValues}
            />
            <PointPreview point={point} cameras={cameras} />
          </div>
        );
      }
    }
  }
  return null;
}
