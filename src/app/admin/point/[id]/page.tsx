import { JsonInput } from "~/app/admin/_components/json-input";

export default async function AdminPoint({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <div className="flex flex-row justify-center gap-10 p-10">
      <JsonInput />
    </div>
  );
}
