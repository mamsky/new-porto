"use client";
import WindowsLogo from "@/assets/logowindows.png";
import Image from "next/image";
import { useState } from "react";
import UseGetProfile from "../../hook/profile/useGetProfile";
import CardProfile from "../card-profile";
import TableProject from "../table/table-project";
import TableTech from "../table/table-tech";
import TableWork from "../table/table-work";
import ButtonLogout from "./button-logout";
import ButtonMyProject from "./project/button-project";
import ButtonTech from "./tech/button-tech";
import ButtonWork from "./work/button-work";
const ButtonMenu = () => {
  const [isShow, setIsShow] = useState<boolean>(true);
  const { data, isFetched } = UseGetProfile();
  return (
    <div className="hidden md:block">
      <div
        hidden={isShow}
        className="fixed bottom-12 h-[60%] lg:w-[25%] md:w-[40%] bg-blue-800"
      >
        {/* top  */}
        {isFetched && (
          <div className="flex items-center gap-6 pl-6 py-4 bg-gradient-to-b from-blue-800 to-blue-600">
            <Image
              src={data?.images || ""}
              alt="logo-admin"
              width={50}
              height={50}
              className="rounded-md"
            />
            <h1 className="text-white text-3xl">{data?.surname}</h1>
          </div>
        )}

        <hr />
        {/* center  */}
        <div className="grid grid-cols-2 md:h-[73%] xl:h-[75%]">
          <div className="bg-white ml-1 p-2 text-black flex flex-col gap-4">
            {/* content  1*/}
            <TableTech />
            {/* content 2 */}
            <TableWork />
            {/* content 3 */}
            <TableProject />
            {/* end content  */}
          </div>
          <div className="bg-blue-100 mr-1 p-2 text-black flex flex-col gap-4">
            {/* content  1*/}
            <CardProfile />
            {/* content  2*/}
            <ButtonTech />
            {/* content  3*/}
            <ButtonWork />
            {/* content  3*/}
            <ButtonMyProject />
            {/* end content  */}
          </div>
        </div>
        {/* bottom  */}
        <ButtonLogout />
      </div>

      <button
        onClick={() => setIsShow(!isShow)}
        className="hidden md:block bg-green-600 text-2xl cursor-pointer px-6 border-white border-1 py-2 rounded-r-xl font-bold text-amber-100"
      >
        <div className="flex gap-4">
          <Image src={WindowsLogo} alt="logo" width={30} height={20} />
          Start
        </div>
      </button>
    </div>
  );
};

export default ButtonMenu;
