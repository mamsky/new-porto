import { ProjectTypes } from "@/lib/types/project.types";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { LuLink } from "react-icons/lu";

export const LayoutMyProject = ({ data }: { data: ProjectTypes }) => {
  return (
    <div className="bg-white/10 backdrop-blur-2xl rounded-lg p-4 shadow-lg shadow-stone-800 dark:shadow-white/50">
      <div className="bg-black/20 dark:bg-white/20 backdrop-blur-md rounded-md flex justify-center">
        {typeof data.images == "string" && (
          <Image
            src={data.images}
            alt="my project"
            width={1000}
            height={1000}
            className="min-h-52 max-h-60 object-contain group-hover:opacity-90 transition-opacity"
          />
        )}
      </div>
      <hr />
      <div className="p-4">
        <h3 className="font-semibold text-2xl mb-3">{data.title}</h3>
        <p className="text-gray-600 dark:text-white text-lg mb-4">
          {data.description?.slice(0, 150)}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mb-6 px-4">
        {data.techstack.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-black/50 dark:bg-black/50 rounded-full text-md font-medium text-white dark:text-white"
          >
            {tag.techstack}
          </span>
        ))}
      </div>
      <div className="px-4 flex gap-6">
        <a
          href={data.github}
          target="_blank"
          className="flex items-center gap-3 text-md bg-black/10 dark:bg-stone-700 p-2 rounded-xl"
        >
          <FaGithub size={25} />
          <h1
            className={`${
              !data.github
                ? "text-red-500 text-shadow-4xs text-shadow-white"
                : "text-green-500 font-bold"
            }`}
          >
            My Repository
          </h1>
        </a>
        <a
          // aria-disabled={!data.demo ? true : false}
          href={data.demo}
          target="_blank"
          className={`flex items-center gap-3 text-md cursor-pointer hover:text-blue-80`}
        >
          <LuLink size={25} />
          <h1 className={`${data.demo ? "text-blue-400" : "text-red-500"}`}>
            Live Demo
          </h1>
        </a>
      </div>
    </div>
  );
};
