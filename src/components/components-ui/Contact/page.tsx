import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

const ContactPage = () => {
  return (
    <div className="flex justify-center mb-32 text-center">
      <div className=" flex-col">
        <h1 className="text-xl md:text-3xl font-bold mb-3">
          {"Let's build something together"}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-8">
          {
            "Feel free to reach out if you're looking for a developer, have a question, or just want to connect."
          }
        </p>
        <div className="flex items-center gap-4 flex-col md:flex-row text-md md:text-xl justify-center">
          <a
            href="mailto:pasteprosmana189@gmail.com"
            className="flex gap-2 cursor-pointer hover:scale-105 duration-300"
          >
            <MdOutlineMail size={20} className="mt-2" />
            <h1>pasteprosmana189@gmail.com</h1>
          </a>
          <span className="hidden md:block">|</span>
          <a href="" className="flex items-center gap-2 duration-300">
            <FaWhatsapp size={20} className="text-green-500" />
            <h1>62 896-112-41174</h1>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
