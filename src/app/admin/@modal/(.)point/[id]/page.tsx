import { Modal } from "~/components/component/modal";
import { FullPagePoint } from "~/app/admin/_components/full-page-point";

export default async function AdminPointModal({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <FullPagePoint id={id} />
    </Modal>
  );
}
