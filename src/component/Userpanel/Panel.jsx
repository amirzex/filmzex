// App.js یا UserPanelLayout.js
import { Outlet } from "react-router-dom";
import LeftSide from "./LeftSide";

const UserPanelLayout = () => {
  return (
    <div className=" flex flex-row justify-center items-start gap-5 p-5">
      <LeftSide />
      <div className="flex-1 ">
        <Outlet />
      </div>
    </div>
  );
};

export default UserPanelLayout;
