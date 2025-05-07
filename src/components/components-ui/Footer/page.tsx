import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const FooterPage = () => {
  return (
    <div className="flex justify-center my-8">
      <div className="flex-col text-md md:text-xl">
        <h1>© 2025 Designed and coded with ❤️ by Paste Prosmana</h1>
        <div className="flex justify-center gap-6 my-6">
          <Link href={"https://github.com/mamsky"} target="_blank">
            <FaGithub size={32} />
          </Link>
          <Link
            href={"https://www.linkedin.com/in/paste-prosmana/"}
            target="_blank"
          >
            <FaLinkedin size={32} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterPage;
