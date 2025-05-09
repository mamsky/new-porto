"use client";
import useFormatDate from "@/lib/hook/format-date";
import { WorkTypeData } from "@/lib/types/work.types";
import Image from "next/image";

export const ListWork = ({ data }: { data: WorkTypeData }) => {
  return (
    <div className="space-y-6 mb-12 shadow-gray-500 shadow-lg rounded-xl">
      <div className="flex flex-col md:flex-row items-start bg-white dark:bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-sm">
        {typeof data.images == "string" && (
          <Image
            height={2000}
            width={2000}
            alt="Dumbways Logo"
            src={data.images}
            className="w-16 h-16 rounded-lg mb-4 md:mb-0 object-contain bg-white"
          />
        )}
        <div className="md:ml-8 flex-grow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h1 className="font-semibold text-2xl">{data.title}</h1>
              <p className="text-green-600 dark:text-green-400 text-xl">
                {data.company}
              </p>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
              {useFormatDate(data.startDate)} - {useFormatDate(data.endDate)}
            </span>
          </div>

          <ul className="text-gray-600 list-disc dark:text-white text-lg space-y-2 mb-4 ml-5">
            {data.description?.map((desc, index) => (
              <li key={index} className="">
                {desc.desc}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {data.technology?.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-black/50 dark:bg-white/30 rounded-full text-xs font-medium text-white dark:text-white"
              >
                {tech.techstack}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
