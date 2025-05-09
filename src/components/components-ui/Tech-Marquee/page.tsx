"use client";
import { UseGetTech } from "@/components/hook/tech/useGetTech";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";
import TechLayout from "./layout";
import SkeletonTech from "@/components/ui/skeleton-tech";

const TechMarqueePage = () => {
  const { data, isPending } = UseGetTech();
  if (isPending) {
    return <SkeletonTech />;
  }
  return (
    <div id="tech">
      <TechLayout />
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-white dark:from-gray-950 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-white dark:from-gray-950 to-transparent pointer-events-none"></div>
        <Marquee pauseOnHover className="[--duration:20s]">
          {Array.isArray(data) && data.length > 0
            ? data.map((icons) => (
                <div key={icons.id}>
                  <div className="mx-6 border p-1 bg-white/30 backdrop-blur-sm rounded-2xl w-20 h-20 flex items-center ">
                    {typeof icons.images == "string" && (
                      <Image
                        src={icons.images}
                        alt="icons"
                        width={200}
                        height={200}
                        className="hover:scale-110 cursor-pointer rounded-md"
                      />
                    )}
                  </div>
                  <h3 className="text-center text-lg">{icons.name}</h3>
                </div>
              ))
            : "No data Techstack available "}
        </Marquee>
      </div>
    </div>
  );
};

export default TechMarqueePage;
