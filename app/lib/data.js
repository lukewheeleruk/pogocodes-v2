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
  where,
} from "firebase/firestore";

// Clean up Firestore data for client use
const transformPlayer = (docSnap) => {
  const data = docSnap.data();
  return {
    id: docSnap.id, // keep UID as unique identifier
    username: data.username,
    code: data.code,
    team: data.team,
    tags: data.tags,
    message: data.message,
    level: data.level,
    location: data.location || null,
    lastBump: data.lastBump ? data.lastBump.toMillis() : null, // ✅ JSON-safe
  };
};

const buildFirestoreQuery = (filters, cursor) => {
  let q = query(collection(db, "dev_profiles"));
  // Define how each filter should be applied in Firestore
  const filterMap = {
    team: { field: "team", type: "==" },
    tags: { field: "tags", type: "array-contains" },
    country: { field: "location.country", type: "==" },
    // future filters can just be added here
    // e.g. level: { field: "level", type: "==" }
  };
  Object.entries(filters).forEach(([key, value]) => {
    if (value && filterMap[key]) {
      const { field, type } = filterMap[key];
      q = query(q, where(field, type, value));
    }
  });
  // Always order and limit
  q = query(q, orderBy("lastBump", "desc"), limit(5));
  // Apply cursor for pagination if provided
  if (cursor) {
    q = query(q, startAfter(cursor));
  }

  return q;
};

export async function getPlayers(filters, cursorDocId) {
  // Get Firestore document for cursor if provided
  const cursorDoc = cursorDocId
    ? await getDoc(doc(db, "dev_profiles", cursorDocId))
    : null;

  // Build and execute query
  const querySnapshot = await getDocs(buildFirestoreQuery(filters, cursorDoc));

  // Transform documents
  const players = querySnapshot.docs.map(transformPlayer);

  // Set cursor to last document in snapshot (or null if empty)
  const cursor = querySnapshot.docs.length
    ? querySnapshot.docs[querySnapshot.docs.length - 1].id
    : null;

  return { players, cursor };
}

export async function getCountries() {
  const countries = [];
  const querySnapshot = await getDocs(
    query(collection(db, "dev_countries"), orderBy("name", "asc"))
  );
  querySnapshot.forEach((doc) => {
    countries.push(doc.data());
  });
  return countries;
}
