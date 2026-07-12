import { Outlet } from "react-router-dom";
import LeftSide from "@/features/user-panel/components/Sidebar";

const UserPanelLayout = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] p-2 sm:p-5">
      <div className="mx-auto flex max-w-7xl flex-col items-stretch gap-3 lg:flex-row lg:gap-5">
        <LeftSide />
        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserPanelLayout;
