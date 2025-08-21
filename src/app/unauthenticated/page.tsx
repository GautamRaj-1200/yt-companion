import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function Unauthenticated({ searchParams }: Props) {
  const session = await auth();

  // Normalize callbackUrl to a single string
  const raw = searchParams?.callbackUrl;
  const callbackUrl = (Array.isArray(raw) ? raw[0] : raw) || "/profile";

  if (session?.user) {
    redirect(callbackUrl);
  }

  async function handleSignIn() {
    "use server";
    await signIn("google", { redirectTo: callbackUrl });
  }

  return (
    <div className="m-2">
      <h2>You need to Log In to view this page.</h2>
      <form action={handleSignIn}>
        <button
          type="submit"
          className="cursor-pointer bg-gray-950 border border-gray-600 rounded-sm px-2 py-1 text-sm text-white"
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
}
