import { type User } from "@supabase/supabase-js";
import Breadcrumbs from "./Breadcrumbs";
import LogoutButton from "./LogoutButton";
import ThemeButton from "./ThemeButton";
import AdminButton from "./AdminButton";

async function Header(props: { user: User }) {
  return (
    <header className="flex w-full flex-row justify-center border-b-2 p-4">
      <div className=" flex w-full max-w-screen-2xl flex-row place-content-between items-center">
        <Breadcrumbs />
        <div className="flex flex-row items-center justify-center gap-4">
          <ThemeButton />
          <AdminButton />
          <LogoutButton user={props.user} />
        </div>
      </div>
    </header>
  );
}

export default Header;
