// App.js یا UserPanelLayout.js
import { Outlet } from "react-router-dom";
import LeftSide from "@/features/user-panel/components/Sidebar";

const UserPanelLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-stretch gap-3 lg:gap-5 p-2 sm:p-5">
      <LeftSide />
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
};

export default UserPanelLayout;
