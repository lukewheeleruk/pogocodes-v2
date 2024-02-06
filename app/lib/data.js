import { db } from "@/app/lib/firebase";
import {
  getDoc,
  doc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
} from "firebase/firestore";

function justGetWhatWeNeed(playerObject) {
  // this function takes a player object returned from our database (doc.data()), and returns a new object
  // that just has the keys needed for dev work - this was mainly needed because the Timestamps
  // on the real objects meant the player object couldn't be passed down to client components, which
  // is annoying, but whilst developing, I didn't need all the data in each player object - just the basics.
  return {
    username: playerObject.username,
    code: playerObject.code,
  };
}

export async function getInitialData() {
  // this function runs on the server and enables instant loading with the first few
  // players already loaded, and a Firestore cursor ready to enable further additions to the list
  const initialPlayers = [];
  let initialCursor = "";
  const q = query(
    collection(db, "dev_profiles"),
    orderBy("lastBump", "desc"),
    limit(5)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    initialPlayers.push(justGetWhatWeNeed(doc.data()));
    initialCursor = doc.id;
    // although the document ID alone isn't a suitable cursor, it can be used to fetch the relevant
    // document snapshot, which CAN be used as a cursor.
  });

  return { initialPlayers: initialPlayers, initialCursor: initialCursor };
}

export async function getAdditionalPlayers(cursor) {
  const additionalPlayers = [];
  let newCursor = null;
  const docSnap = await getDoc(doc(db, "dev_profiles", cursor));
  const q = query(
    collection(db, "dev_profiles"),
    orderBy("lastBump", "desc"),
    limit(5),
    startAfter(docSnap)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    additionalPlayers.push(justGetWhatWeNeed(doc.data()));
    newCursor = doc.id;
  });
  return { additionalPlayers: additionalPlayers, newCursor: newCursor };
}
