// useMonthYearFormat.js
import { useMemo } from "react";

const useFormatDate = (dateString: string) => {
  const formattedDate = useMemo(() => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short", // menghasilkan "Jan", "Feb", ..., "Dec"
    });
  }, [dateString]);

  return formattedDate;
};

export default useFormatDate;
