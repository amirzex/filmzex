import { Outlet } from "react-router-dom";
import Header from "@/shared/layout/Header";
import Footer from "@/shared/layout/Footer";

function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export { RootLayout };
