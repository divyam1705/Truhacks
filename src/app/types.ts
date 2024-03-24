export interface Course {

    courseId: string;
    name: string;
    description: string;
    instructors?:Instructor[];
    // instructor: string[];    // links to the User who is the instructor
    meetingLink: string;
    imgLink: string;
    // QAs?: QA[];
    date: Date
    tags: string[];
  }


export type UserRole = 'student' | 'instructor'; 


  export interface User {
    userId: string;
    name: string;
    email: string;
    sMedia?: string[];       // social media links
    role: UserRole;
    courses?: string[];     // optional - instructor's teaching courses and student's enrolled courses
  }

  export interface QA {
    question: string;
    answer: string;
  }
  export interface Instructor{
    name: string;      // social media links
    designation: string;
    description:string;
    image:string;
  }

