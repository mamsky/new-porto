"use client";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { ReactNode } from "react";
import { useGuard } from "../hook/use-guard";

const AuthGuard = ({ children }: Readonly<{ children: ReactNode }>) => {
  const { isPending, isFetched } = useGuard();

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isFetched) {
    return <>{children}</>;
  }
};

export default AuthGuard;
