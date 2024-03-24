import { db } from "./firebase";
import {
    setDoc,
    doc,
    collection,
    getDoc,
    getDocs,
} from "firebase/firestore";
import { Course, User } from "./types";

// Retrieves all course documents.
export const getCourses = async (course: Course) => {
    try {
        return await getDocs(collection(db, "courses"));
    } catch {
        console.log("Failed to get courses");
    }
};

// Retrieves a specific course by ID.
export const getCourse = async (course: Course) => {
    try {
        return await getDoc(doc(db, "courses", course.courseId));
    } catch {
        console.log("Failed to get courses");
    }
};

// Adds a new course document.
export const addCourse = async (course: Course) => {
    try {
        await setDoc(doc(db, "courses", course.name), course);
    } catch {
        console.log("Failed to add course");
    }
};

// Updates an existing course document.
export const updateCourse = async (course: Course) => {
    try {
        await setDoc(doc(db, "courses", course.courseId), course);
    } catch {
        console.log("Failed to update course");
    }
};

// Retrieves a specific user by ID.
export const getUser = async (user: User) => {
    try {
        return await getDoc(doc(db, "users", user.userId));
    } catch {
        console.log("Failed to get user");
    }
};

// Adds a new user document, ensuring no duplicates.
export const addUser = async (user: User) => {
    try {
        const userDoc = await getDoc(doc(db, "users", user.userId));
        if (userDoc.exists()) return; // Skip if user already exists
        await setDoc(doc(db, "users", user.userId), user);
    } catch (error) {
        console.error("Error adding user:", error);
    }
};
