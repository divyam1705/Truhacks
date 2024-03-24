"use client"
import React from 'react'
import Link from 'next/link';
import Image from "next/image"
import { AnimatedTooltip } from '@/components/ui/animated-tootip';
import { Calendar } from '@/components/ui/calendar';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Course } from "@/app/types"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// export interface Course {
//     courseId: string;
//     name: string;
//     description: string;
//     instructorId: string;    // links to the User who is the instructor
//     meetingLink: string;
//     imgLink: string;
//     QAs: QA[];
//   }

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
)
function TimeSelector({ hrs }: { hrs: boolean }) {
    // console.log(hrs);
    const hours = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const minutes = ["00", "10", "20", "30", "40", "50"];

    return (
        <Select >
            <SelectTrigger className="w-[70px] ">
                <SelectValue placeholder={hrs === true ? "12" : "00"} />
            </SelectTrigger>
            <SelectContent>
                {hrs === true ? hours.map((num: string, ind) => {
                    return (
                        <SelectItem key={ind} value={num}>{num}</SelectItem>
                    )
                }) :
                    minutes.map((num: string, ind) => {
                        return (
                            <SelectItem key={ind + 14} value={num}>{num}</SelectItem>
                        )

                    })

                }
            </SelectContent>
        </Select>

    );
}
function MeridianSelector() {

    return (
        <Select >
            <SelectTrigger className="w-[70px] ">
                <SelectValue placeholder="AM" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem  value="AM">AM</SelectItem>
                <SelectItem  value="PM">PM</SelectItem>
            </SelectContent>
        </Select>

    );
}
function ScrollAreaDemo() {
    return (
        <ScrollArea className="h-72 w-48 rounded-md border">
            <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
                {tags.map((tag) => (
                    <>
                        <div key={tag} className="text-sm">
                            {tag}
                        </div>
                        <Separator className="my-2" />
                    </>
                ))}
            </div>
        </ScrollArea>
    )
}

function DatePicker() {
    const [date, setDate] = React.useState<Date>()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

function DialogDemo() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add Course</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Course</DialogTitle>
                    <DialogDescription>
                        Just add a new course you want to teach! happy teching!
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-left">
                            Name
                        </Label>
                        <Input id="name" value="" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-left">
                            Description
                        </Label>
                        <Input id="username" value="" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="meet-link" className="text-left">
                            Link
                        </Label>
                        <Input id="meet-link" value="" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image-link" className="text-left">
                            Image Link
                        </Label>
                        <Input id="image-link" value="" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image-link" className="text-left">
                            Date
                        </Label>
                        <DatePicker />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image-link" className="text-left">
                            Time
                        </Label>
                        <TimeSelector hrs={true} />
                        <TimeSelector hrs={false} />
                       <MeridianSelector/>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Add </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

// import Navbar from '@/components/navbar';
//TODO
function Tag({ color, tag_name }: { color: string, tag_name: string }) {
    return (
        <div className='mx-2 px-4 rounded bg-gray-900 w-[80px] h-[20px] flex items-center justify-between border-2'>
            <div className='rounded-3xl bg-red-300 w-[6px] h-[7px]'></div>
            <div className=' text-[8px]  text-gray-300'> {tag_name}</div>
        </div>
    )
}
function CourseCard({ title, course_img, course_instructors, description, course_id }: { title: string, course_img: string, course_instructors: string[], description: string, course_id: string }) {
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
        <Link href={"/courses/" + course_id}>
            <Card className='w-[320px] h-[330px] m-2 text-lg cursor-pointer transition-transform duration-300 transform hover:-translate-y-3'>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className='overflow-hidden whitespace-nowrap'>React is react and you dont know react. so freaking learn it</CardDescription>
                </CardHeader>
                <CardContent>
                    <Image className='rounded-lg w-[330px] h-[150px]' width={330} height={150} src={course_img} alt="" />
                </CardContent>
                <CardFooter className='flex flex-col justify-center items-center -mt-3'>
                    <div className='flex justify-center items-center mb-2'>
                        <Tag color="red" tag_name='Fullstack' />
                        <Tag color="red" tag_name='Frontend' /></div>
                    <div className='flex justify-center items-center mb-2'>
                        <AnimatedTooltip items={people} />
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
            <DialogDemo />
            <div className='flex justify-center items-center'>

                <div className='  grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                    <CourseCard title="React" course_img="https://cdn.mindmajix.com/courses/react-js-training.png" course_instructors={["Ff"]} description="bulbula hhoon main" course_id='1' />
                    <CourseCard title="React" course_img="https://cdn.mindmajix.com/courses/react-js-training.png" course_instructors={["Ff"]} description="bulbula hhoon main" course_id='2' />

                    <CourseCard title="React" course_img="https://cdn.mindmajix.com/courses/react-js-training.png" course_instructors={["Ff"]} description="bulbula hhoon main" course_id='3' />

                    <CourseCard title="React" course_img="https://cdn.mindmajix.com/courses/react-js-training.png" course_instructors={["Ff"]} description="bulbula hhoon main" course_id='4' />

                </div>
            </div></>
    )
}

export default Coursepage