"use client"
import Instructorcard from '@/components/Instructor_card'
// import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import React from 'react'
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

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
    profilePicture: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    designation: "Software Developer",
    description: "I love to teach!!",
    rating: 5
  };
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
        <Instructorcard instructor={myinstructor} />
      </div>
    </>
  )
}

export default Coursepage