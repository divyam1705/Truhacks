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
    getDocs,
} from "firebase/firestore";
import { Course } from "./types";

export const getCourses = async ( course: Course  ) => {
    try {
        const courseDocs = await getDocs(collection(db, "courses"));
        return courseDocs;
    } catch {
        console.log("Failed to get courses")
    }
}

export const getCourse = async ( course: Course  ) => {
    try {
        const courseDoc = await getDoc(doc(db, "courses" , course.courseId));
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
        await setDoc(doc(db, "courses", course.name), course );
    } catch {
        console.log("Failed to update course")
    }
}