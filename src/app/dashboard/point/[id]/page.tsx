import { FullPagePointView } from "../FullPagePointView";

export default async function PhotoModal({
  params: { id },
}: {
  params: { id: string };
}) {
  return <FullPagePointView id={id} />;
}
