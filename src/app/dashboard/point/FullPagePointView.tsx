
export async function FullPagePointView(props: { id: string }) {
  const idAsNumber = Number(props.id);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid id");


  return (
    <div className="flex h-full w-screen min-w-0 items-center justify-center text-white">
      {props.id}
    </div>
  );
}
