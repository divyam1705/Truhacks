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
import { Course } from "./types";

export const getCourses = async () => {
    try {
        const courseDoc = await getDoc(doc(db, "courses"));
        if (!courseDoc.exists()) { return; }

        return courseDoc;

    } catch {
        console.log("Failed to get courses")
    }
}

export const addCourse = async (course: Course) => {
    try {
        await setDoc(doc(db, "courses", course.name), course);
    } catch {
        console.log("Failed to add course")
    }
}

export const updateCourse = async (course: Course) => {
    try {
        await updateDoc(doc(db, "courses", course.name), course);
    } catch {
        console.log("Failed to update course")
    }
}