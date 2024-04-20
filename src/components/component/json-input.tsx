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
      pairs: [{ x: "", y: "" }], // initializing with one pair of inputs
    },
    validationSchema: Yup.object({
      matrix: Yup.array().of(Yup.number().required("Required")).min(9).max(9),
      pairs: Yup.array().of(
        Yup.object().shape({
          x: Yup.number().required("X value is required"),
          y: Yup.number().required("Y value is required"),
        }),
      ),
    }),
    onSubmit: (values) => {
      console.log({
        homography_matrix: [
          [values.matrix[0], values.matrix[1], values.matrix[2]],
          [values.matrix[3], values.matrix[4], values.matrix[5]],
          [values.matrix[6], values.matrix[7], values.matrix[8]],
        ],
        ground_polygon: values.pairs.map((pair) => [pair.x, pair.y]),
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

  const addPair = () => {
    void formik.setFieldValue("pairs", [
      ...formik.values.pairs,
      { x: "", y: "" },
    ]);
  };
  const removePair = (index: number) => {
    const newPairs = [...formik.values.pairs];
    newPairs.splice(index, 1);
    void formik.setFieldValue("pairs", newPairs);
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
        <CardContent>
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
          {formik.values.pairs.map((pair, index) => (
            <div key={index} className="mt-6 grid grid-cols-3 items-end gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor={`pairs.${index}.x`}>X</Label>
                <Input
                  id={`pairs.${index}.x`}
                  placeholder="0"
                  type="number"
                  name={`pairs.${index}.x`}
                  value={pair.x}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor={`pairs.${index}.y`}>Y</Label>
                <Input
                  id={`pairs.${index}.y`}
                  placeholder="0"
                  type="number"
                  name={`pairs.${index}.y`}
                  value={pair.y}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="flex items-center">
                <Button type="button" onClick={() => removePair(index)}>
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <div className="mt-4 flex justify-end">
            <Button type="button" onClick={addPair}>
              Add Another XY Pair
            </Button>
          </div>
          <div className="mt-4 flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
