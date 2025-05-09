import React from "react";
import { dummySchool, SchoolSchemasDTO } from "@/lib/dummy-data/school-dummy";
import Image from "next/image";

const School = () => {
  const data: SchoolSchemasDTO[] = dummySchool;
  return (
    <>
      {data.map((datas, i) => (
        <div
          className="space-y-6 mb-12 shadow-gray-500 shadow-lg rounded-xl"
          key={i}
        >
          <div className="flex flex-col md:flex-row items-start bg-white dark:bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-sm">
            {typeof datas.images == "string" && (
              <Image
                height={2000}
                width={2000}
                alt="Dumbways Logo"
                src={datas.images}
                className="w-16 h-16 rounded-lg mb-4 md:mb-0 object-contain bg-white"
              />
            )}
            <div className="md:ml-8 flex-grow">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h1 className="font-semibold text-2xl">{datas.name}</h1>
                  <p className="text-green-600 dark:text-green-400 text-xl">
                    {datas.major}
                  </p>
                </div>
                <span className="px-3 py-1 bg-black/50 dark:bg-white/30 rounded-full text-lg font-medium text-green-500">
                  {datas.status}
                </span>
              </div>

              <ul className="text-gray-600 list-disc dark:text-white text-lg space-y-2 mb-4">
                {datas.address} {datas.city} {datas.province}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default School;
