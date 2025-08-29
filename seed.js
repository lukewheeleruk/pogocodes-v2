import { db } from "@/app/lib/firebase";
import {
  getDoc,
  setDoc,
  doc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
  where,
} from "firebase/firestore";

//reference to the dev_profiles collection
const devProfilesRef = collection(db, "dev_profiles");

//query to get all records in dev_profiles collection where the team is "Mystic"
const mysticQuery = query(devProfilesRef, where("team", "==", "Mystic"));
const instinctQuery = query(devProfilesRef, where("team", "==", "Instinct"));
const valorQuery = query(devProfilesRef, where("team", "==", "Valor"));

const giftsQuery = query(
  devProfilesRef,
  where("tags", "array-contains", "Gifts")
);
const raidsQuery = query(
  devProfilesRef,
  where("tags", "array-contains", "Raids")
);
const pvpQuery = query(devProfilesRef, where("tags", "array-contains", "PvP"));
const tradesQuery = query(
  devProfilesRef,
  where("tags", "array-contains", "Trades")
);

export async function updateGiftsTag() {
  let updatedCount = 0;
  const querySnapshot = await getDocs(giftsQuery);
  querySnapshot.forEach(async (docSnapshot) => {
    const docRef = doc(db, "dev_profiles", docSnapshot.id);
    await setDoc(docRef, { tags: ["g"] }, { merge: true });
    updatedCount++;
    console.log(`Updated document with ID: ${docSnapshot.id}`);
  });
  console.log(
    `Updated ${updatedCount} documents in the dev_profiles collection.`
  );
}

//function to execute the query and get the documents, then update each document's team to "mystic" and set it to the database
export async function updateMysticTeam() {
  let updatedCount = 0;
  const querySnapshot = await getDocs(mysticQuery);
  querySnapshot.forEach(async (docSnapshot) => {
    const docRef = doc(db, "dev_profiles", docSnapshot.id);
    await setDoc(docRef, { team: "mystic" }, { merge: true });
    updatedCount++;
    console.log(`Updated document with ID: ${docSnapshot.id}`);
  });
  console.log(
    `Updated ${updatedCount} documents in the dev_profiles collection.`
  );
}

export async function updateInstinctTeam() {
  let updatedCount = 0;
  const querySnapshot = await getDocs(instinctQuery);
  querySnapshot.forEach(async (docSnapshot) => {
    const docRef = doc(db, "dev_profiles", docSnapshot.id);
    await setDoc(docRef, { team: "instinct" }, { merge: true });
    updatedCount++;
    console.log(`Updated document with ID: ${docSnapshot.id}`);
  });
  console.log(
    `Updated ${updatedCount} documents in the dev_profiles collection.`
  );
}

export async function updateTagsOnAllRecords() {
  const querySnapshot = await getDocs(query(collection(db, "dev_profiles")));
  querySnapshot.forEach(async (docSnapshot) => {
    const randomTags = // Generate a random number of tags between 1 and 4, with possible values "gifts", "raids", "pvp", "trades"
      ["gifts", "raids", "pvp", "trades"]
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 4) + 1);
    const docRef = doc(db, "dev_profiles", docSnapshot.id);
    await setDoc(docRef, { tags: randomTags }, { merge: true });
    console.log(`Updated document with ID: ${docSnapshot.id}`);
  });
  console.log(
    `Updated ${querySnapshot.size} documents in the dev_profiles collection.`
  );
}
