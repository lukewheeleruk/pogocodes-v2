"use server";

import { db } from "@/app/lib/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addProfile(formData) {
  const rawFormData = {
    username: formData.get("username"),
    team: formData.get("team"),
    code: formData.get("code"),
    tags: formData.get("tags"),
    lastBump: Timestamp.now(),
  };

  await addDoc(collection(db, "dev_profiles"), rawFormData);

  console.log(rawFormData);

  revalidatePath("/");
  redirect("/");
}
