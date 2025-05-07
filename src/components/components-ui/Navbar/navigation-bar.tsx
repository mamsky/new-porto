import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoImage from "@/assets/Logo-paste.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";

const NavigationBar = () => {
  const handleButtonTech = (text: string) => {
    document.getElementById(text)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="flex justify-between my-4">
      <div>
        <Avatar className="w-12 h-12">
          <AvatarImage src={LogoImage.src} alt="Paste" />
          <AvatarFallback>Paste</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="md:hidden cursor-pointer">
            <RxHamburgerMenu />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="md:hidden">
            <DropdownMenuItem onClick={() => handleButtonTech("tech")}>
              Tech Stack
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleButtonTech("work")}>
              Experience
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleButtonTech("project")}>
              Projects
            </DropdownMenuItem>
            <a
              href="https://wa.me/6289611241174"
              target="_blank"
              className="bg-green-500 my-2 hover:bg-green-600 text-white text-sm cursor-pointer px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium"
            >
              <FaWhatsapp />
              {" Let's Talk"}
            </a>
            <ModeToggle />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className=" hidden md:block">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => handleButtonTech("tech")}
            className="cursor-pointer bg-transparent text-black dark:text-white"
          >
            Tech Stack
          </button>
          <button
            onClick={() => handleButtonTech("work")}
            className="cursor-pointer bg-transparent text-black dark:text-white"
          >
            Experience
          </button>
          <button
            onClick={() => handleButtonTech("project")}
            className="cursor-pointer bg-transparent text-black dark:text-white"
          >
            Projects
          </button>
          <a
            href="https://wa.me/6289611241174"
            target="_blank"
            className="bg-green-500 hover:bg-green-600 text-white text-sm cursor-pointer px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium"
          >
            <FaWhatsapp />
            {" Let's Talk"}
          </a>
          <Button>
            <HiOutlineDocumentDownload />
            Download CV
          </Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
