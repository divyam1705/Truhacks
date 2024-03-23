import Image from "next/image";
import Navbar from "@/components/navbar";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Spotlight } from "@/components/ui/Spotlight";
export default function Home() {
  return (
    <>
    <Navbar/>
    <Spotlight/>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
        TeachMate
    <TextGenerateEffect 
        words="Teaching Made Personal, Learning Made Possible . . ."

    />
    </main>
    {/* </Spotlight> */}
    </>
  );
}
