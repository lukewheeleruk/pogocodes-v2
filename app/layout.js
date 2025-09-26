import { Inter } from "next/font/google";
import { Onest } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/app/lib/context/AuthContext";
import { PlayersProvider } from "@/app/lib/context/PlayersContext";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });
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
          <PlayersProvider>
            <div className="max-w-[720px] mx-auto">{children}</div>
            <Toaster richColors position="bottom-center" />
          </PlayersProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
