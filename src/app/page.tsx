import ContactPage from "@/components/components-ui/Contact/page";
import DashboardPage from "@/components/components-ui/Dashboard/page";
import FooterPage from "@/components/components-ui/Footer/page";
import { MyProjectPage } from "@/components/components-ui/my-project/page";
import NavbarLayout from "@/components/components-ui/Navbar/layout";
import TechMarqueePage from "@/components/components-ui/Tech-Marquee/page";
import WorkExperience from "@/components/components-ui/Work-Experience/page";

export default function Home() {
  return (
    <div className="mx-4 md:mx-[5%] xl:mx-[15%]">
      <NavbarLayout />
      <DashboardPage />
      <TechMarqueePage />
      <WorkExperience />
      <MyProjectPage />
      <ContactPage />
      <hr />
      <FooterPage />
    </div>
  );
}
