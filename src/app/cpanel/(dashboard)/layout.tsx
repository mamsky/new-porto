import ButtonMenu from "@/components/ui/button/button-menu";
import AuthGuard from "@/lib/utils/auth-guard";

const DashboardLayout = () => {
  return (
    <AuthGuard>
      <div className="bg-[url('/images/windowsXp.jpg')] bg-cover bg-center h-screen">
        <div className="flex justify-center h-full items-center">
          <h1 className="text-white text-4xl">Welcome Admin</h1>
        </div>
        <div className="fixed flex items-center bottom-0 w-full bg-gradient-to-t from-blue-800 to-blue-600 h-12">
          <ButtonMenu />
        </div>
      </div>
    </AuthGuard>
  );
};

export default DashboardLayout;
