import { Modal } from "~/components/component/modal";
import { JsonInput } from "~/app/admin/_components/json-input";

export default async function AdminPointModal({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <JsonInput />
    </Modal>
  );
}
