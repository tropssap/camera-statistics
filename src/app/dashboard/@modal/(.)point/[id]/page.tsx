import { FullPagePointView } from "~/app/dashboard/point/FullPagePointView";
import { Modal } from "../../../../../common/modal";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <FullPagePointView photoId={photoId} />
    </Modal>
  );
}
