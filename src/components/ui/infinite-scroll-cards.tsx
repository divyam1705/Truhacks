"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Instructorcard from "../Instructor_card";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  const myinstructor = {
    instructor_name: "Bulbul",
    profilePicture: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    designation: "Software Developer",
    description: "I love to teach!!",
    rating: 5
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
            <Instructorcard instructor={myinstructor}/>
        //   <li
        //     className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
        //     style={{
        //       background:
        //         "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
        //     }}
        //     key={item.name}
        //   >
        //     <blockquote>
        //       <div
        //         aria-hidden="true"
        //         className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
        //       ></div>
        //       <span className=" relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
        //         {item.quote}
        //       </span>
        //       <div className="relative z-20 mt-6 flex flex-row items-center">
        //         <span className="flex flex-col gap-1">
        //           <span className=" text-sm leading-[1.6] text-gray-400 font-normal">
        //             {item.name}
        //           </span>
        //           <span className=" text-sm leading-[1.6] text-gray-400 font-normal">
        //             {item.title}
        //           </span>
        //         </span>
        //       </div>
        //     </blockquote>
        //   </li>
        ))}
      </ul>
    </div>
  );
};
