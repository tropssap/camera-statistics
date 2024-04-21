import { FullPagePoint } from "../../_components/full-page-point";

export default async function AdminPoint({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <div className="flex flex-row justify-center ">
      <FullPagePoint id={id} />
    </div>
  );
}
