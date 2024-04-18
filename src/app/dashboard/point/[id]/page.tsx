import { FullPagePointView } from "../FullPagePointView";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  return <FullPagePointView photoId={photoId} />;
}
