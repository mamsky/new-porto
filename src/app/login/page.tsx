"use client";
import LogoImage from "@/assets/Logo-paste.png";
import { Button } from "@/components/ui/button";
import { LoginSchemaDTO, LoginSchemas } from "@/lib/schemas/login.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FaArrowRight, FaPowerOff, FaUserCircle } from "react-icons/fa";
import { useLogin } from "./hook/useLogin";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaDTO>({
    mode: "onChange",
    resolver: zodResolver(LoginSchemas),
  });

  const { mutateAsync } = useLogin();

  const onSubmit = async (data: LoginSchemaDTO) => {
    await mutateAsync(data);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-600 to-blue-400 flex flex-col justify-between text-white font-sans">
      <div className="fixed top-0 bg-gradient-to-b from-blue-800 via-blue-700 to-blue-600 w-full h-20 z-10" />
      <div className="flex flex-1 items-center justify-center px-4 py-8 mt-20">
        <div className="flex flex-col md:flex-row bg-blue-300/30 backdrop-blur-md rounded-lg shadow-lg overflow-hidden w-full max-w-4xl min-h-[400px]">
          <div className="flex-1 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/30 p-6 text-center">
            <Image
              src={LogoImage}
              alt="Windows Xp"
              className="w-16 h-16 rounded shadow mb-4"
            />
            <h1 className="text-3xl font-semibold mb-2">Login</h1>
            <div className="text-xl md:text-2xl font-bold drop-shadow-lg">
              Dashboard<span className="text-orange-400">Setting</span>
            </div>
          </div>
          <div className="flex-1 p-6 md:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <FaUserCircle size={50} />
              <div>
                <div className="text-lg md:text-xl font-bold">
                  Administrator
                </div>
                <p className="text-white/80 text-sm">Type your password</p>
              </div>
            </div>
            <div className="my-2">
              <input
                type="text"
                {...register("username")}
                placeholder="Email/Username"
                className="w-full px-4 py-2 rounded border border-white/30 text-white"
              />
              {errors.username && <p>{errors.username.message}</p>}
            </div>
            <div>
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className="w-full px-4 py-2 rounded border border-white/30 text-white"
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <Button
              onClick={handleSubmit(onSubmit)}
              className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-800 rounded text-white self-end cursor-pointer"
            >
              <FaArrowRight />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 bg-gradient-to-t from-blue-800 to-blue-600 px-4 md:px-8 py-3 text-sm text-center">
        <Link
          href="/"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded flex items-center gap-2"
        >
          <FaPowerOff /> Turn back
        </Link>
        <p className="text-white/70 text-xs max-w-md text-right">
          After you log on, you can add or change accounts. Just go to Control
          Panel and click User Accounts.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
