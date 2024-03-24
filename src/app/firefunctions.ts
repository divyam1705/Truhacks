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
export const getCourses = async () => {
    try {
        const snapshot=await getDocs(collection(db, "courses"));
        const coursesList = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              ...data
            //   courseId: doc.id, // Ensure you're setting the courseId or any other required fields correctly
            };
          });
          return coursesList;
        
    } catch {
        console.log("Failed to get courses");
    }
    
};

// Retrieves a specific course by ID.
export const getCourse = async (courseId:string) => {
    
    try {
        const docRef = doc(db, "courses", courseId);
        const courseSnapshot = await getDoc(docRef);
        
        if (courseSnapshot.exists()) {
            return courseSnapshot.data();
        } else {
            console.log("Course does not exist");
            return null;
        }
    } catch (error) {
        console.error("Failed to get course:", error);
        throw error; // Rethrow the error to handle it at the caller level
    }
};

// Adds a new course document.
export const addCourse = async (course: Course) => {
    const courseDocRef = await doc(db, "courses", course.courseId);
    try {
        console.log(course);
        await setDoc(courseDocRef, course);
        // console.log("added course");
    } catch (error){
        console.log(error);
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
