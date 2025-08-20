import { signIn, signOut, auth } from "@/auth";

export default async function SignIn() {
  const session = await auth();

  if (!session?.user) {
    return (
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button
          type="submit"
          className="cursor-pointer rounded-sm px-2 py-1 text-sm"
        >
          Sign in with Google
        </button>
      </form>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        type="submit"
        className="cursor-pointer rounded-sm px-2 py-1 text-sm"
      >
        Sign Out
      </button>
    </form>
  );
}
