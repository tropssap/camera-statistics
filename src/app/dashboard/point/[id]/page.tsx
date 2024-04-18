export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  return <div className="h-[200vh] bg-slate-400">{photoId}</div>;
}
