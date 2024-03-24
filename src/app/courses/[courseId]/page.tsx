"use client"
import Instructorcard from '@/components/Instructor_card'
// import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'

import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Separator } from '@radix-ui/react-separator'
import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-scroll-cards";

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
    instructor_name: "Bulbul",
    profilePicture: "https://cdn.vox-cdn.com/thumbor/RcAdlMhw-adDQnJiVWKRPUSP10M=/0x0:2024x1038/1200x800/filters:focal(989x320:1311x642)/cdn.vox-cdn.com/uploads/chorus_image/image/71278865/Screen_Shot_2022_08_23_at_4.22.21_PM.0.png",
    designation: "Software Developer",
    description: "I love to teach!!",
    rating: 5
  };
function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[30rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
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

  const { toast } = useToast();
  return (
    <>
      {/* <Navbar /> */}

      <div className='p-10'>
        <div className='flex  justify-between items-center  flex-col md:flex-row lg:flex-row xl:flex-row md:items-start lg:items-start xl:items-start '>
          <div className=' w-[35vw] min-w-[400px]  bg-white bg-opacity-5 border-2  rounded-xl p-5 flex flex-col items-center gap-5 '>
            <img
              className='rounded-lg w-[360px] h-[220px]'
              src="https://cdn.mindmajix.com/courses/react-js-training.png" alt="" />
            <div className='flex justify-center items-center '>

              <Tag color="red" tag_name="Tailwind" />
              <Tag color="blue" tag_name="Next.js" />
            </div>
            <DatePicker />
            <Button variant="outline"
              onClick={() => {
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
            <div className='my-4 text-center text-5xl font-semibold'>React</div>
            <div className='mt-3 w-[40vw] font-extralight text-md'>
              React is react and you dont know react so you should just learn react then you get a job in react then get a good reaction
            </div>
          </div>
        </div>
        <Separator/>
        <InfiniteMovingCardsDemo/>
        {/* <div className='bg-red-300 animate-scroll w-screen flex justify-center items-center '>
        <Instructorcard instructor={myinstructor} />
        </div> */}
      </div>
    </>
  )
}

export default Coursepage