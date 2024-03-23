import { db } from "./firebase"
import {
    setDoc,
    doc,
    collection,
    addDoc,
    query,
    updateDoc,
    arrayUnion,
    orderBy,
    limit,
    getDoc,
    where,
} from "firebase/firestore";


export const getCourses = async () => {
    try {
        const courseDoc = await getDoc(doc(db, "courses"));
        if (!courseDoc.exists()) { return; }

        return courseDoc;

    } catch {
        console.log("Failed to get courses")
    }
}