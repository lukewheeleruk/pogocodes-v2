import SubmitProfileForm from "@/app/ui/SubmitProfileForm";
import localFont from "next/font/local";
import { Card } from "@/components/ui/card";

const myFont = localFont({
  src: "../../public/ZalandoSansExpanded-VariableFont_wght.ttf",
  variable: "--font-zalando",
});

export default function SubmitPage() {
  return (
    <div className="flex flex-col mx-auto p-4 items-center">
      <h1 className={`text-2xl font-bold mb-4 ${myFont.className}`}>
        Submit your profile
      </h1>
      <p className="mb-12 text-center">
        Add or update your Pokemon Go friend code profile to connect with other
        trainers around the world!
      </p>
      <Card className="w-full max-w-lg p-6">
        <SubmitProfileForm />
      </Card>
    </div>
  );
}
