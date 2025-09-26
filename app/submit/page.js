import SubmitProfileForm from "@/app/ui/SubmitProfileForm";
import localFont from "next/font/local";

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
      <SubmitProfileForm />
    </div>
  );
}
