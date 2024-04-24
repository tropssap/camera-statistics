import { Button } from "~/components/ui/button";
import Link from "next/link";
import { getUserRole } from "./actions";

export default async function AdminButton() {
  const userRole = await getUserRole();
  console.log(userRole);
  return (
    <>
      {userRole === "admin" && (
        <>
          <Button asChild variant="secondary">
            <Link href="/dashboard">User</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/admin">Admin</Link>
          </Button>
        </>
      )}
    </>
  );
}
