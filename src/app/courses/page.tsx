"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from "next/image"
import { AnimatedTooltip } from '@/components/ui/animated-tootip';
import { Calendar } from '@/components/ui/calendar';
import { addCourse, getCourses } from '../firefunctions';
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
import { useRouter } from 'next/navigation';
let cnums = 0;
const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
)
function TimeSelector({ hrs, vari, setvari }: { hrs: boolean, vari: string, setvari: (v: string) => void }) {
    // console.log(hrs);
    const hours = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const minutes = ["00", "10", "20", "30", "40", "50"];

    return (
        <Select onValueChange={(val) => { setvari(val) }} >
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
function MeridianSelector({ vari, setvari }: { vari: string, setvari: (v: string) => void }) {

    return (
        <Select onValueChange={setvari}>
            <SelectTrigger className="w-[70px] ">
                <SelectValue placeholder="AM" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="AM">AM</SelectItem>
                <SelectItem value="PM">PM</SelectItem>
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

function DatePicker({ date, setDate }: { date: Date | undefined, setDate: (d: Date | undefined) => void }) {

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
    function createDateTime(date: Date | undefined, hour: string, minute: string, meridian: string): Date {
        if (date === undefined || (merid !== "AM" && merid != "PM")) { return new Date(); }
        let hours24 = parseInt(hour, 10);
        const minutes = parseInt(minute, 10);

        if (meridian === "PM" && hours24 < 12) {
            hours24 += 12;
        } else if (meridian === "AM" && hours24 === 12) {
            hours24 = 0;
        }

        const dateTime = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            hours24,
            minutes
        );

        return dateTime;
    }

    const [name, setname] = useState("");
    const [description, setdescription] = useState("");
    const [link, setlink] = useState("");
    const [imageLink, setimageLink] = useState("");
    const [date, setDate] = React.useState<Date>()
    const [hours, sethours] = useState("");
    const [minutes, setminutes] = useState("");
    const [merid, setmerid] = useState("");
    const [tag1, settag1] = useState("");
    const [tag2, settag2] = useState("");
    // console.log(object);
    async function handleAddCourse(cnums: Number) {
        const newCourse: Course = {
            courseId: cnums.toString(),
            name: name,
            description: description,
            // instructors: [{
            //     name: localStorage.getItem("name"),
            //     designation: string,
            //     description: string,
            //     image: string,
            // }],   // links to the User who is the instructor
            meetingLink: link,
            imgLink: imageLink,
            date: createDateTime(date, hours, minutes, merid),
            tags: [tag1, tag2]
        }
        setname("");
        setdescription("");
        setimageLink("");
        setlink("");
        // console.log(newCourse);
        //TODO
        await addCourse(newCourse);

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="fixed bottom-5 right-5 z-50 w-[55px] h-[55px] rounded-3xl" variant="outline">
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 10.5V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H12M18 21V15M15 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                </Button>
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
                        <Input id="name" value={name} onChange={(cv) => { setname(cv.target.value) }} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-left">
                            Description
                        </Label>
                        <Input id="description" onChange={(cv) => { setdescription(cv.target.value) }} value={description} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 ">
                        <Label htmlFor="tag1" className="text-left">
                            Tag
                        </Label>
                        <div className=''>

                            <Input id="tag1" placeholder='English' onChange={(cv) => { settag1(cv.target.value) }} value={tag1} className="col-span-3" />
                        </div>
                        <div>
                            <Input id="tag2" placeholder='Physics' onChange={(cv) => { settag2(cv.target.value) }} value={tag2} className="col-span-3" />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="meet-link" className="text-left">
                            Link
                        </Label>
                        <Input id="meet-link" onChange={(cv) => { setlink(cv.target.value) }} value={link} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image-link" className="text-left">
                            Image Link
                        </Label>
                        <Input id="image-link" onChange={(cv) => { setimageLink(cv.target.value) }} value={imageLink} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image-link" className="text-left">
                            Date
                        </Label>
                        <DatePicker date={date} setDate={setDate} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image-link" className="text-left">
                            Time
                        </Label>
                        <TimeSelector hrs={true} vari={hours} setvari={sethours} />
                        <TimeSelector hrs={false} vari={minutes} setvari={setminutes} />
                        <MeridianSelector vari={merid} setvari={setmerid} />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={() => { handleAddCourse(cnums) }}>Add </Button>
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
function CourseCard(course: Course) {
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
    const pth = "/courses/" + course.courseId;


    return (
        <Link
            href={{ pathname: pth }}>

            <Card className='w-[320px] h-[330px] m-2 text-lg cursor-pointer transition-transform duration-300 transform hover:-translate-y-3'>
                <CardHeader>
                    <CardTitle>{course.name}</CardTitle>
                    <CardDescription className='overflow-hidden whitespace-nowrap'>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Image className='rounded-lg w-[330px] h-[150px]' width={330} height={150} src={course.imgLink} alt="" />
                </CardContent>
                <CardFooter className='flex flex-col justify-center items-center -mt-3'>
                    <div className='flex justify-center items-center mb-2'>
                        <Tag color="red" tag_name={course.tags[0]} />
                        <Tag color="red" tag_name={course.tags[1]} /></div>
                    <div className='flex justify-center items-center mb-2'>
                        <AnimatedTooltip items={people} />
                    </div>

                </CardFooter>
            </Card>

        </Link>);

}
function Coursepage() {
    const [courses, setcourses] = useState<Course[]>([]);
    const router = useRouter();
    useEffect(() => {
        getCourses().then(allcourses => {
            if (allcourses !== undefined) {
                const fullCourses: Course[] = allcourses.map((course) => ({
                    // ...course,
                    // Assuming default or placeholder values for missing properties
                    courseId: course.courseId,
                    name: course.name || "Unknown Course",
                    description: course.description || "No description available.",
                    instructors: course.instructors,
                    meetingLink: course.meetingLink || "https://example.com",
                    imgLink: course.imgLink || "https://example.com/default-image.png",
                    date: course.date ? new Date(course.date) : new Date(),
                    tags: course.tags || ["Uncategorized"]
                }));
                setcourses(fullCourses);
                cnums = fullCourses.length;
            }
        });
    }, []);
    // if(!localStorage.getItem("userEmail")){
    //     router.push("/sign")
    // }
    return (
        <>
            {/* <Navbar /> */}

            <div className='ml-10 my-7 text-4xl font-semibold'>Courses</div>
            <DialogDemo />
            <div className='flex justify-center items-center'>

                <div className='  grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                    {courses.map((cour, ind) => {
                        return (<CourseCard
                            key={ind}
                            {...cour}
                        />);
                    })
                    }
                    {/* <CourseCard title="React" course_img="https://cdn.mindmajix.com/courses/react-js-training.png" course_instructors={["Ff"]} description="bulbula hhoon main" course_id='1' />
                    <CourseCard title="React" course_img="https://cdn.mindmajix.com/courses/react-js-training.png" course_instructors={["Ff"]} description="bulbula hhoon main" course_id='2' />

                    <CourseCard title="React" course_img="https://cdn.mindmajix.com/courses/react-js-training.png" course_instructors={["Ff"]} description="bulbula hhoon main" course_id='3' />

                    <CourseCard title="React" course_img="https://cdn.mindmajix.com/courses/react-js-training.png" course_instructors={["Ff"]} description="bulbula hhoon main" course_id='4' /> */}

                </div>
            </div></>
    )
}

export default Coursepage