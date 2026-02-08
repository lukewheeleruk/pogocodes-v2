import SubmitProfileForm from "@/app/ui/SubmitProfileForm";
import localFont from "next/font/local";
import { Card } from "@/components/ui/card";
import { PlayersProvider } from "@/app/lib/context/PlayersContext";

const myFont = localFont({
  src: "../../public/ZalandoSansExpanded-VariableFont_wght.ttf",
  variable: "--font-zalando",
});

export default function SubmitPage() {
  return (
    <PlayersProvider>
      <div className="flex flex-col mx-auto p-4 items-center">
        <h1 className={`text-2xl font-bold mb-4 ${myFont.className}`}>
          Submit your profile
        </h1>
        <p className="mb-12 text-center text-muted-foreground max-w-xl">
          Add or update your Pokemon Go friend code profile to connect with
          other trainers around the world!
        </p>
        <Card className="w-full max-w-lg p-6 border-border/70 bg-card/95 shadow-lg">
          <SubmitProfileForm />
        </Card>
      </div>
    </PlayersProvider>
  );
}
