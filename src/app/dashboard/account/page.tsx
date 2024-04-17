import AccountForm from "./account-form";
import { createClient } from "~/server/supabase/supabase";

export default async function Account() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <AccountForm user={user} />;
}
