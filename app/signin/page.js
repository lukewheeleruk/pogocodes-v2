"use client";

import { auth } from "@/app/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Optional: redirect after sign-in
      window.location.href = "/";
    } catch (err) {
      console.error("Sign-in failed", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-6">Sign in</h1>
      <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
    </div>
  );
}
