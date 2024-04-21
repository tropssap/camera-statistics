import { FullPagePointView } from "../FullPagePointView";

export default async function Point({
  params: { id },
}: {
  params: { id: string };
}) {
  return <FullPagePointView id={id} />;
}
