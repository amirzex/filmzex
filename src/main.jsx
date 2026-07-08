import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Comment } from "./component/Commentpage/Comment.jsx";
import { Root } from "./component/layout/Root.jsx";
import Showall from "./component/Showmore/Showall.jsx";
import Register from "./component/Auth/Register.jsx";
import { Infopage } from "./component/secondpage/Infopage.jsx";
import Contactus from "./component/FooterStufs/Contactus.jsx";
import DMCA from "./component/FooterStufs/DMCA.jsx";
import Role from "./component/FooterStufs/Role.jsx";
import CommonQuestion from "./component/FooterStufs/Common Question.jsx";
import { Movie } from "./component/movies/Movie.jsx";
import { TVshow } from "./component/TVshow/TVshow.jsx";
import Blogstyle from "./component/Blog/Blogstyle.jsx";
import { Blog2th } from "./component/Blogpage/Blog2th.jsx";
import Panel from "./component/Userpanel/Panel.jsx";
import Account from "./component/Userpanel/Pages/Account.jsx";
import Favorite from "./component/Userpanel/Pages/Favorite.jsx";
import Buy from "./component/Userpanel/Pages/Buy.jsx";
import Setting from "./component/Userpanel/Pages/Setting.jsx";
import Security from "./component/Userpanel/Pages/Security.jsx";
import LeftSide from "./component/Userpanel/LeftSide.jsx";
import UserPanelLayout from "./component/Userpanel/Panel.jsx";
import Dashboard from "./component/Userpanel/Pages/Dashboard.jsx";

const router = createBrowserRouter([
  // Register route - OUTSIDE the Root layout (no header/footer)
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/userpanel",
    element: <UserPanelLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        path: "Dashboard",
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "favorite",
        element: <Favorite />,
      },
      {
        path: "buy",
        element: <Buy />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
      {
        path: "security",
        element: <Security />,
      },
    ],
  },
  // Main routes with header/footer
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <App />,
      },

      {
        path: "/team/:id",
        element: <Infopage />,
      },
      {
        path: "/comment",
        element: <Comment />,
      },
      {
        path: "/showall",
        element: <Showall />,
      },
      {
        path: "/contactus",
        element: <Contactus />,
      },
      {
        path: "/DMCA",
        element: <DMCA />,
      },
      {
        path: "/Role",
        element: <Role />,
      },
      {
        path: "/CommonQuestion",
        element: <CommonQuestion />,
      },
      {
        path: "/Movie",
        element: <Movie />,
      },
      {
        path: "/TVshow",
        element: <TVshow />,
      },
      {
        path: "/Blogstyle",
        element: <Blogstyle />,
      },
      {
        path: "/Blog2th/:id",
        element: <Blog2th />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
