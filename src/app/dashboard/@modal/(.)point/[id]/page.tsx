import { Modal } from "./modal";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <div className="min-h-4  text-white">{photoId}dawdadaD</div>
    </Modal>
  );
}
