import SubmitProfileForm from "@/app/ui/SubmitProfileForm";

export default function SubmitPage() {
  return (
    <div className="flex flex-col mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Submit Your Profile</h1>
      <p className="mb-4">
        Add or update your Pokemon Go friend code profile to connect with other
        trainers around the world!
      </p>
      <SubmitProfileForm />
    </div>
  );
}
