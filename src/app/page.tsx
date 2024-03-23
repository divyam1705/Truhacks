"use client"
import Image from "next/image";
import Navbar from "@/components/navbar";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Spotlight } from "@/components/ui/Spotlight";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { useRouter } from "next/navigation";
export default function Home() {
  const router=useRouter();
  return (
    <>
      <Navbar />
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">

        <div className="flex flex-col justify-center items-center font-semibold  mt-[-40px] ">
          <div className="mb-20 text-8xl">TeachMate</div>
          <TextGenerateEffect
          // className="m-2"
            words="Teaching Made Personal, Learning Made Possible . . ."
          />
          <div className="flex justify-center items-center mt-8 text-lg">
          <HoverBorderGradient 
          onClick={()=>{router.push("/sign")}}
          >Start Learning</HoverBorderGradient>
          {/* <HoverBorderGradient >LogIn</HoverBorderGradient> */}
          </div>
        </div>
      </main>
    </>
  );
}
