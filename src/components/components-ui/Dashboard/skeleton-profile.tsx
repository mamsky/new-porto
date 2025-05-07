import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCardProfile() {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-16 mt-32 ml-12 mb-32">
      <Skeleton className=" w-64 h-64 lg:w-[320px] lg:h-[320px] rounded-xl" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-12 w-xl" />
        <Skeleton className="h-32" />
      </div>
    </div>
  );
}
