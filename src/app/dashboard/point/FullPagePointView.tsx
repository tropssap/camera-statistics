import { createClient } from "~/server/supabase/supabase";
import AddPoint from "~/common/AddPoint";
import Link from "next/link";

export async function FullPagePointView(props: { photoId: string }) {
  const idAsNumber = Number(props.photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  return (
    <div className="flex h-full w-screen min-w-0 items-center justify-center text-white">
      {props.photoId}
    </div>
  );
}
