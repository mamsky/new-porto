"use client";
import { useGetProject } from "@/components/hook/project/useGetProject";
import { LayoutMyProject } from "./layout";
import SkeletonCard from "@/components/ui/skeleton-card";

export const MyProjectPage = () => {
  const { data, isPending } = useGetProject();

  if (isPending) {
    return <SkeletonCard name="My Projects:" />;
  }

  return (
    <div className="mb-32" id="project">
      {/* spacer for id  */}
      <div className="h-24"></div>
      <h1 className="text-2xl md:text-3xl font-bold mb-8">My Projects:</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item) => <LayoutMyProject key={item.id} data={item} />)
        ) : (
          <>
            <h1>No Data</h1>
          </>
        )}
      </div>
    </div>
  );
};
