"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";

export function JsonInput() {
  const formik = useFormik({
    initialValues: {
      matrix: Array(9).fill(""), // for 3x3 matrix inputs
      pairs: "", // initializing with one pair of inputs
    },
    validationSchema: Yup.object({
      matrix: Yup.array().of(Yup.number().required("Required")).min(9).max(9),
      pairs: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log({
        homography_matrix: [
          [values.matrix[0], values.matrix[1], values.matrix[2]],
          [values.matrix[3], values.matrix[4], values.matrix[5]],
          [values.matrix[6], values.matrix[7], values.matrix[8]],
        ],
        ground_polygon: values.pairs,
      });
    },
    validateOnBlur: true,
    validateOnChange: true,
  });
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!formik.isValid || !formik.dirty) {
      toast.error("Check fields");
    } else {
      void formik.submitForm();
    }
  };
  return (
    <Card className="w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Matrix Input</CardTitle>
          <CardDescription>
            Enter numeric values in the 3x3 matrix below.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4">
            {formik.values.matrix.map((value, index) => (
              <Input
                key={index}
                placeholder="0"
                type="number"
                name={`matrix.${index}`}
                value={value as string}
                onChange={formik.handleChange}
              />
            ))}
          </div>
          <Input
            placeholder="[[x, y], [x, y]]"
            type="text"
            name={`pairs`}
            value={formik.values.pairs}
            onChange={formik.handleChange}
          />
          <div className=" flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
