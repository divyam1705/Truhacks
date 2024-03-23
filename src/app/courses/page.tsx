
import React from 'react'
import Link from 'next/link';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { AnimatedTooltip } from '@/components/ui/animated-tootip';
// import Navbar from '@/components/navbar';
//TODO
function Tag({color,tag_name}:{color:string,tag_name:string}){
    return (
        <div className='mx-2 px-4 rounded bg-gray-900 w-[80px] h-[20px] flex items-center justify-between border-2'>
            <div className='rounded-3xl bg-red-300 w-[6px] h-[7px]'></div>
            <div className=' text-[8px]  text-gray-300'> {tag_name}</div>
        </div>
    )
}
function CourseCard({title, course_img, course_instructors,description,course_id}:{title:string, course_img:string, course_instructors:string[],description:string,course_id:string}){
    const people = [
        {
          id: 1,
          name: "John Doe",
          designation: "Software Engineer",
          image:
            "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
        },
        {
          id: 2,
          name: "Robert Johnson",
          designation: "Product Manager",
          image:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        },
        {
          id: 3,
          name: "Jane Smith",
          designation: "Data Scientist",
          image:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        },
       
      ];
    return (
        <Link href={"/courses/"+course_id}>
        <Card className='w-[320px] h-[330px] m-2 text-lg cursor-pointer transition-transform duration-300 transform hover:-translate-y-3'>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription className='overflow-hidden whitespace-nowrap'>React is react and you dont know react. so freaking learn it</CardDescription>
            </CardHeader>
            <CardContent>
                <img className='rounded-lg w-[330px] h-[150px]' src={course_img} alt="" />
            </CardContent>
            <CardFooter  className='flex flex-col justify-center items-center -mt-3'>
            <div className='flex justify-center items-center mb-2'>
                <Tag color="red" tag_name='Fullstack'/>
            <Tag color="red" tag_name='Frontend'/></div> 
            <div className='flex justify-center items-center mb-2'>
            <AnimatedTooltip  items={people} />
            </div>
            
            </CardFooter>
        </Card>
        </Link>);

}
function Coursepage() {
    return (
        <>
        {/* <Navbar /> */}
        <div className='ml-10 my-7 text-4xl font-semibold'>Courses</div>
        <div className='flex justify-center items-center'>
            
        <div className='  grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
            <CourseCard  title="React" course_img="https://cdn.mindmajix.com/courses/react-js-training.png" course_instructors={["Ff"]} description="bulbula hhoon main" course_id='1'/>
            <CourseCard  title="React" course_img="https://cdn.mindmajix.com/courses/react-js-training.png" course_instructors={["Ff"]} description="bulbula hhoon main" course_id='2'/>

            <CourseCard  title="React" course_img="https://cdn.mindmajix.com/courses/react-js-training.png" course_instructors={["Ff"]} description="bulbula hhoon main" course_id='3'/>

            <CourseCard  title="React" course_img="https://cdn.mindmajix.com/courses/react-js-training.png" course_instructors={["Ff"]} description="bulbula hhoon main" course_id='4'/>

        </div>
        </div></>
    )
}

export default Coursepage