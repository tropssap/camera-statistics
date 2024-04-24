"use client";

import { useFormik } from "formik";
import { toast } from "sonner";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { type Json } from "~/types/supabase";
import { type CameraObject } from "./full-page-point";

export function JsonInput({
  cameras,
  initialValues,
}: {
  cameras: {
    created_at: string;
    id: number;
    name: string | null;
    point_id: number | null;
    processed: boolean;
    url: string | null;
  }[];
  initialValues: CameraObject;
}) {
  const formik = useFormik({
    initialValues: {
      ...initialValues,
    },
    onSubmit: (values) => {
      const deepCopy = JSON.parse(JSON.stringify(values)) as CameraObject;
      for (const key in deepCopy) {
        const a = deepCopy[key];
        if (a) {
          a.homography_matrix = [
            [
              a.homography_matrix[0] as number,
              a.homography_matrix[1] as number,
              a.homography_matrix[2] as number,
            ],
            [
              a.homography_matrix[3] as number,
              a.homography_matrix[4] as number,
              a.homography_matrix[5] as number,
            ],
            [
              a.homography_matrix[6] as number,
              a.homography_matrix[7] as number,
              a.homography_matrix[8] as number,
            ],
          ];
        }
      }

      void navigator.clipboard.writeText(JSON.stringify(deepCopy));
      toast("Copied");
    },
  });
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    void formik.submitForm();
  };
  return (
    <>
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Cameras</CardTitle>
          </CardHeader>
          {cameras.map((camera) => (
            <CardContent className="flex flex-col gap-4" key={camera.id}>
              <CardDescription>{camera.name}</CardDescription>
              <div className="grid grid-cols-3 gap-4">
                {formik.values[camera.id]?.homography_matrix.map(
                  (value, index) => (
                    <Input
                      key={`${camera.id}-${index}`}
                      placeholder="0"
                      type="number"
                      name={`${camera.id}.homography_matrix.${index}`}
                      value={value as number}
                      onChange={(e) =>
                        formik.setFieldValue(
                          `${camera.id}.homography_matrix.${index}`,
                          +e.target.value,
                        )
                      }
                    />
                  ),
                )}
              </div>
              <Input
                placeholder="[[x, y], [x, y]]"
                type="text"
                name={`${camera.id}.ground_polygon`}
                value={formik.values[camera.id]?.ground_polygon}
                onChange={formik.handleChange}
              />
            </CardContent>
          ))}
          <CardFooter>
            <div className=" flex justify-end">
              <Button type="submit">Copy</Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
