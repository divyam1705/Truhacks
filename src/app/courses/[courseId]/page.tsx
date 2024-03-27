"use client"
import Instructorcard from '@/components/Instructor_card';
// import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import Image from 'next/image'
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Separator } from '@radix-ui/react-separator'
import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-scroll-cards";
import { Course } from '@/app/types';
import { getCourse } from '@/app/firefunctions';
import { Link } from 'lucide-react';
import { link } from 'fs';

function Tag({ color, tag_name }: { color: string, tag_name: string }) {
  return (
    <div className='mx-2 px-7 rounded  bg-white bg-opacity-0 w-[115px] h-[26px] flex items-center justify-between border-2'>
      <div className='rounded-3xl bg-red-300 w-[8px] h-[8px]'></div>
      <div className=' text-[11px]  text-gray-300'> {tag_name}</div>
    </div>
  )
}

function Coursepage({ params }: any) {
  const myinstructor = {
    instructor_name: "Andrew Tate",
    profilePicture: "https://qph.cf2.quoracdn.net/main-qimg-3be2088e92c69897cb5328e2f0587c80-pjlq",
    designation: "Software Developer",
    description: "I love to teach!! Not Women! get abs ! whats the color of your buggati",
    rating: 5
  };
  function InfiniteMovingCardsDemo() {
    const instructor_array=[{
      instructor_name: "Peter Maher",
      profilePicture: "https://t4.ftcdn.net/jpg/01/01/04/21/360_F_101042187_ksgPPYdbzU24Jql483ByxCVSwXICLM2w.jpg",
      designation: "Software Developer",
      description: "I love to teach!! ",
      rating: 5
    },
    {
      instructor_name: "Brenda Boyce",
      profilePicture: "https://amysmusicnook.co.uk/wp-content/uploads/2020/07/Profile-Pic.jpg",
      designation: "Doctor",
      description: " Keep pushing forward, for the wealth of knowledge you accumulate today is the foundation of your tomorrow.",
      rating: 5
    }
  ]
    return (
      <div className="h-[20rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={instructor_array}
          direction="right"
          speed="fast"
        />
      </div>
    );
  }

  const testimonials = [
    {
      quote:
        "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
      name: "Charles Dickens",
      title: "A Tale of Two Cities",
    },
    {
      quote:
        "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
      name: "William Shakespeare",
      title: "Hamlet",
    },
    {
      quote: "All that we see or seem is but a dream within a dream.",
      name: "Edgar Allan Poe",
      title: "A Dream Within a Dream",
    },
    {
      quote:
        "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
      name: "Jane Austen",
      title: "Pride and Prejudice",
    },
    {
      quote:
        "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
      name: "Herman Melville",
      title: "Moby-Dick",
    },
  ];
  const [course, setcourse] = useState<Course>({
    courseId: "00000",
    name: "Business",
    description: "Earn money become millionare!! but first you have to be a billionaire",
    instructors: [{
      name: "Andre Tate",      // social media links
    designation: "Business man",
    description:"",
    image:""
    }, ] ,  // links to the User who is the instructor
    meetingLink: "",
    imgLink: "https://www.devonblog.com/wp-content/uploads/2022/06/tailwind-thumb.jpg",
    date: new Date(),
    tags: ["Money", "$ dollars"]
  });
  useEffect(() => {
    getCourse(params.courseId).then((cour) => {
      // console.log(cour);
      setcourse(cour as Course);
    })
  }, []);

  const { toast } = useToast();
  if (!course) {
    <div>...Loading</div>
  }
  // console.log(course,course.date);
  return (
    <>
      {/* <Navbar /> */}

      <div className=''>
        <div className='p-10 flex  justify-between items-center  flex-col md:flex-row lg:flex-row xl:flex-row md:items-start lg:items-start xl:items-start '>
          <div className=' w-[35vw] min-w-[400px]  bg-white bg-opacity-5 border-2  rounded-xl p-5 flex flex-col items-center gap-5 '>
            <Image
              className='rounded-lg w-[360px] h-[220px]'
              width={360}
              height={220}
              src={course.imgLink} alt="" />
            <div className='flex justify-center items-center '>

              <Tag color="red" tag_name={course.tags[0]} />
              <Tag color="blue" tag_name={course.tags[1]} />
            </div>
            <DatePicker dat={course.date} />
            <Button variant="outline"
              onClick={() => {
                window.location.href = course.meetingLink;
                toast({
                  title: "Scheduled: React",
                  description: "Friday, February 10, 2023 at 6 PM",
                  action: (
                    <ToastAction altText="Goto schedule to undo">Close</ToastAction>
                  ),
                })
              }}
            >Add to Calendar</Button>

          </div>
          <div className='w-[55vw] p-5 flex flex-col  items-center justify-start'>
            <div className='my-4 text-center text-5xl font-semibold'>{course.name}</div>
            <div className='mt-3 w-[40vw] font-extralight text-md'>
              {course.description}
            </div>
          </div>
        </div>
        <Separator />
        <InfiniteMovingCardsDemo />
        {/* <div className='bg-red-300 animate-scroll w-screen flex justify-center items-center '>
        <Instructorcard instructor={myinstructor} />
        </div> */}
      </div>
    </>
  )
}

export default Coursepage