"use client";

import { auth } from "@/app/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import localFont from "next/font/local";

const myFont = localFont({
  src: "../../public/ZalandoSansExpanded-VariableFont_wght.ttf",
  variable: "--font-zalando",
});

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
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <span
        className={`text-4xl text-primary font-bold mb-16 ${myFont.className}`}
      >
        pogo.codes
      </span>
      <Card className="mx-8">
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            Login to your account
          </CardTitle>
          <CardDescription>
            Sign in to add your profile, or to bump it up the feed if you've
            previously added it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            className="w-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Sign in with Google
          </Button>
          <div className="my-4 after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-card text-muted-foreground relative z-10 px-2">
              Or continue with e-mail
            </span>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
