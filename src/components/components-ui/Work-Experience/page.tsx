"use client";
import { useGetWork } from "@/components/hook/work/useGetWork";
import SkeletonWork from "@/components/ui/skeleton-work";
import { ListWork } from "./layout";
import School from "@/components/ui/school";
const WorkExperience = () => {
  const { data, isPending } = useGetWork();

  if (isPending) {
    return <SkeletonWork name="Work Experiences:" />;
  }

  return (
    <div id="work">
      <div className="h-24"></div>
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold">
          {Array.isArray(data) && data?.length > 0
            ? "Work Experiences"
            : "Education:"}
        </h2>
      </div>
      {Array.isArray(data) && data.length > 0 ? (
        data.map((item) => <ListWork key={item.id} data={item} />)
      ) : (
        <>
          <School />
        </>
      )}
    </div>
  );
};

export default WorkExperience;
