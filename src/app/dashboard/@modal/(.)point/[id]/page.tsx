import { FullPagePointView } from "~/app/dashboard/point/FullPagePointView";
import { Modal } from "~/components/component/modal";

export default async function PointModal({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <FullPagePointView id={id} />
    </Modal>
  );
}
