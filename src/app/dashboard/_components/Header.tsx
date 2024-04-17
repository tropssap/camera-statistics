import { type User } from "@supabase/supabase-js";
import Breadcrumbs from "./Breadcrumbs";
import LogoutButton from "./LogoutButton";

function Header(props: { user: User }) {
  return (
    <header className="flex w-full flex-row justify-center border-b-2 p-4">
      <div className="flex w-full max-w-screen-2xl flex-row place-content-between items-center">
        <Breadcrumbs />
        <LogoutButton user={props.user} />
      </div>
    </header>
  );
}

export default Header;
