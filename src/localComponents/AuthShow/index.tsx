"use client";

import { signOut } from "@/features/auth/actions";
import { useSession, signOut as nextAuthSignOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthShow = () => {
  const session = useSession();
  const router = useRouter();
  console.log(session);

  const handleSignout = async () => {
    await signOut();
    await nextAuthSignOut({ redirect: false });
    router.push("/sign-in");
  };

  return (
    <div>
      <p>{session.data?.user ? "auth" : "not auth"}</p>
      <button onClick={handleSignout}>Sign out</button>
      {/* <form
        action={signOut}
        onSubmit={(e) => {
          // e.preventDefault();
          handleSignout();
        }}
      >
        <button type="submit">Sign out</button>
      </form> */}
    </div>
  );
};

export default AuthShow;
