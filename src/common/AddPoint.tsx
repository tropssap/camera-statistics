"use client";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { transliterate } from "~/lib/functions";
import { createClient } from "~/app/utils/supabase/client";
import { useState } from "react";
import { Field, FieldArray, Form, Formik, type FormikProps } from "formik";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function AddPoint() {
  const supabase = createClient();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  async function uploadPoint(values: {
    image: File;
    name: string;
    cameras: { name: string; url: string }[];
  }): Promise<boolean> {
    try {
      setUploading(true);

      if (!values.image) {
        // throw new Error("You must select an image to upload.");
        toast.error("You must select an image to upload.");
        return false;
      }
      if (!values.name) {
        toast.error("You must input a name to upload.");
        return false;
      }
      if (values.cameras.length < 1) {
        toast.error("You must add at least one camera.");
        return false;
      }

      const file = values.image;
      const fileExt = file?.name.split(".").pop();
      const filePath = `${(await supabase.auth.getUser()).data.user?.id}/${new Date().toISOString()}.${transliterate(fileExt!)}`;

      const { error: uploadError } = await supabase.storage
        .from("floor_plans")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: img } = supabase.storage
        .from("floor_plans")
        .getPublicUrl(filePath);

      // console.log("File URL:", data.publicUrl);
      img.publicUrl;
      // onUpload(filePath);

      const { data: pointData, error: pointError } = await supabase
        .from("points")
        .insert([{ name: values.name, floor_plan_url: img.publicUrl }])
        .select();
      if (pointError) {
        throw pointError;
      }
      const pointId = (pointData[0] as { id: number }).id;
      const { error: cameraError } = await supabase
        .from("cameras")
        .insert(
          values.cameras.map((camera) => {
            return {
              name: camera.name,
              url: camera.url,
              point_id: pointId,
            };
          }),
        )
        .select();
      if (cameraError) {
        throw cameraError;
      }

      router.prefetch("/dashboard");
      router.push("/dashboard");
    } catch (error) {
      alert("Error creating point!");
    } finally {
      setUploading(false);
      return true;
    }
  }

  return (
    <div className="flex w-full flex-col items-center p-4 text-white">
      <Card className="w-[32em]">
        <Formik
          initialValues={{
            image: undefined as unknown as File,
            name: "",
            cameras: [],
          }}
          onSubmit={function (
            values,
            // formikHelpers: FormikHelpers<{ image: undefined }>,
          ): void | Promise<unknown> {
            void uploadPoint(values);
          }}
        >
          {(
            props: FormikProps<{
              image: File;
              name: string;
              cameras: [];
            }>,
          ) => (
            <Form>
              <CardHeader>
                <CardTitle>Create New Point</CardTitle>
                {/* <CardDescription></CardDescription> */}
              </CardHeader>
              <CardContent className="flex w-full max-w-2xl flex-col items-center gap-2">
                <div className="grid w-full  items-center gap-1.5">
                  <Label htmlFor="name">Point`s name</Label>
                  <Input
                    id="name"
                    name="name"
                    onChange={(event) => {
                      void props.setFieldValue(
                        "name",
                        event.currentTarget.value,
                      );
                    }}
                    disabled={uploading}
                  />
                </div>

                <div className="grid w-full  items-center gap-1.5">
                  <Label htmlFor="picture">Floor plan</Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    onChange={(event) => {
                      void props.setFieldValue(
                        "image",
                        event.currentTarget.files![0],
                      );
                    }}
                    disabled={uploading}
                  />
                </div>
                <FieldArray name="cameras">
                  {({ remove, push }) => (
                    <div className=" w-full">
                      {props.values.cameras.length > 0 &&
                        props.values.cameras.map((_camera, index) => (
                          <Card className="my-4 w-full" key={index}>
                            <CardHeader>
                              <CardTitle>Camera {index + 1}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex w-full flex-col gap-4">
                              <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor={`cameras.${index}.name`}>
                                  Camera name
                                </Label>
                                <Input
                                  id={`cameras.${index}.name`}
                                  name={`cameras.${index}.name`}
                                  onChange={(event) => {
                                    void props.setFieldValue(
                                      `cameras.${index}.name`,
                                      event.currentTarget.value,
                                    );
                                  }}
                                  disabled={uploading}
                                />
                              </div>
                              <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor={`cameras.${index}.url`}>
                                  Camera RTSP
                                </Label>
                                <Input
                                  id={`cameras.${index}.url`}
                                  name={`cameras.${index}.url`}
                                  onChange={(event) => {
                                    void props.setFieldValue(
                                      `cameras.${index}.url`,
                                      event.currentTarget.value,
                                    );
                                  }}
                                  disabled={uploading}
                                />
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button
                                type="button"
                                variant="secondary"
                                className="w-full"
                                onClick={() => remove(index)}
                                disabled={uploading}
                              >
                                Delete Camera
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}

                      <Button
                        type="button"
                        variant="secondary"
                        className="w-full"
                        onClick={() => push({ name: "", email: "" })}
                        disabled={uploading}
                      >
                        Add Camera
                      </Button>
                    </div>
                  )}
                </FieldArray>
              </CardContent>
              <CardFooter>
                <Button className="w-full " type="submit" disabled={uploading}>
                  Create
                </Button>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}

export default AddPoint;
