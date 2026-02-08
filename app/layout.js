import { Onest } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/app/lib/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";

const onest = Onest({ subsets: ["latin"] });

export const metadata = {
  title: "Pogocodes v2",
  description: "The next generation of the revolutionary Pogocodes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${onest.className}`}>
        <AuthProvider>
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
          <Toaster richColors position="bottom-center" />
        </AuthProvider>
      </body>
    </html>
  );
}
