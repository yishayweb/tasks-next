"use server";

import * as auth from "@/auth";

export async function signIn() {
  console.log("signIn");
  await auth.signIn("github", {
    redirectTo: "/",
  });
}

export async function signOut() {
  console.log("signOut");
  await auth.signOut({
    // redirectTo: "/sign-in",
    redirect: false,
  });
}
