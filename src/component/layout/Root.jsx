// component/layout/Root.jsx
import { Outlet, useLocation } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

function Root() {
  const location = useLocation();
  const isAuthPage = ["/register", "/login"].includes(location.pathname);
  const isPanel = ["/userpanel/dashboard", "/userpanel"].includes(
    location.pathname,
  );
  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && !isPanel &&  <Header />}

      <main className="flex-grow">
        <Outlet />
      </main>
      {!isAuthPage && !isPanel && <Footer />}

    </div>
  );
}

export { Root };
