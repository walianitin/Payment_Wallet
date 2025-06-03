"use client"
import { signIn, signOut, useSession } from "next-auth/react";


export default function Page(): JSX.Element {
  const session = useSession();
  return (
   <div>
       home page
   </div>
  );
}