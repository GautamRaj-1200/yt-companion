import Link from "next/link";
import React from "react";
import SignIn from "./SignInOutButton";
import { auth } from "@/auth";
import Image from "next/image";
import ytCompanion from "../../public/assets/yt-companion.png";

const Navbar = async () => {
  const session = await auth();
  return (
    <>
      <nav className="flex justify-between p-2 items-center">
        <Link href="/" className="flex items-center">
          <Image src={ytCompanion} alt="logo" width={150} height={150} />
        </Link>
        <ul className="flex gap-6 items-center">
          {session?.user ? (
            <>
              <li>
                <Link href="/" className="flex gap-2 items-center">
                  <span>{session?.user?.name}</span>
                  <Image
                    src={session?.user?.image || ""}
                    alt={session?.user?.image || ""}
                    width={40}
                    height={40}
                    className="rounded-full border-1 border-[var(--accent)]"
                  />
                </Link>
              </li>
            </>
          ) : null}
          <li>
            <SignIn />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
