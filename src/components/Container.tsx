import { TJobItem } from "../lib/types";
import JobItemContent from "./JobItemContent";
import Sidebar from "./Sidebar";

type ContainerProps = {
  jobItems: TJobItem[];
};

export default function Container({ jobItems }: ContainerProps) {
  return (
    <div className="container">
      <Sidebar jobItems={jobItems} />
      <JobItemContent />
    </div>
  );
}
