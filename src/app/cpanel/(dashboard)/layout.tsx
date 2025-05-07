import ButtonMenu from "@/components/ui/button/button-menu";
import ButtonMyProject from "@/components/ui/button/project/button-project";
import ButtonTech from "@/components/ui/button/tech/button-tech";
import ButtonWork from "@/components/ui/button/work/button-work";
import TableProject from "@/components/ui/table/table-project";
import TableTech from "@/components/ui/table/table-tech";
import TableWork from "@/components/ui/table/table-work";
import AuthGuard from "@/lib/utils/auth-guard";

const DashboardLayout = () => {
  return (
    <AuthGuard>
      <div className="bg-[url('/images/windowsXp.jpg')] bg-cover bg-center h-screen">
        <div className="flex justify-center h-full md:items-center">
          <h1 className="text-white text-4xl">Welcome Admin</h1>
          <div className="fixed left-0 top-16 text-black md:hidden">
            <div className="grid grid-rows-5 gap-4">
              <ButtonTech />
              <TableTech />
              <ButtonWork />
              <TableWork />
              <ButtonMyProject />
              <TableProject />
            </div>
          </div>
        </div>

        <div className="fixed flex items-center bottom-0 w-full bg-gradient-to-t from-blue-800 to-blue-600 h-12">
          <ButtonMenu />
        </div>
      </div>
    </AuthGuard>
  );
};

export default DashboardLayout;
