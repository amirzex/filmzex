import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "@/shared/layout/RootLayout";
import HomePage from "@/features/home/HomePage";
import RegisterPage from "@/features/auth/RegisterPage";
import { MovieDetailPage } from "@/features/movie-detail/MovieDetailPage";
import { CommentsPage } from "@/features/comments/CommentsPage";
import BrowseAllPage from "@/features/catalog/BrowseAllPage";
import { MoviesPage } from "@/features/catalog/MoviesPage";
import { TvShowsPage } from "@/features/catalog/TvShowsPage";
import BlogListPage from "@/features/blog/BlogListPage";
import { BlogDetailPage } from "@/features/blog/BlogDetailPage";
import ContactPage from "@/features/legal/ContactPage";
import DmcaPage from "@/features/legal/DmcaPage";
import TermsPage from "@/features/legal/TermsPage";
import FaqPage from "@/features/legal/FaqPage";
import UserPanelLayout from "@/features/user-panel/UserPanelLayout";
import DashboardPage from "@/features/user-panel/pages/DashboardPage";
import AccountPage from "@/features/user-panel/pages/AccountPage";
import FavoritesPage from "@/features/user-panel/pages/FavoritesPage";
import PurchasesPage from "@/features/user-panel/pages/PurchasesPage";
import SettingsPage from "@/features/user-panel/pages/SettingsPage";
import SecurityPage from "@/features/user-panel/pages/SecurityPage";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/userpanel",
    element: <UserPanelLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "Dashboard", element: <Navigate to="../dashboard" replace /> },
      { path: "account", element: <AccountPage /> },
      { path: "favorite", element: <FavoritesPage /> },
      { path: "buy", element: <PurchasesPage /> },
      { path: "setting", element: <SettingsPage /> },
      { path: "security", element: <SecurityPage /> },
    ],
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movies", element: <MoviesPage /> },
      { path: "movies/:id", element: <MovieDetailPage /> },
      { path: "tv", element: <TvShowsPage /> },
      { path: "browse", element: <BrowseAllPage /> },
      { path: "blog", element: <BlogListPage /> },
      { path: "blog/:id", element: <BlogDetailPage /> },
      { path: "comments", element: <CommentsPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "dmca", element: <DmcaPage /> },
      { path: "terms", element: <TermsPage /> },
      { path: "faq", element: <FaqPage /> },

      // Legacy redirects
      { path: "team/:id", element: <MovieDetailPage /> },
      { path: "Movie", element: <Navigate to="/movies" replace /> },
      { path: "TVshow", element: <Navigate to="/tv" replace /> },
      { path: "showall", element: <Navigate to="/browse" replace /> },
      { path: "Blogstyle", element: <Navigate to="/blog" replace /> },
      { path: "Blog2th/:id", element: <BlogDetailPage /> },
      { path: "comment", element: <Navigate to="/comments" replace /> },
      { path: "contactus", element: <Navigate to="/contact" replace /> },
      { path: "DMCA", element: <Navigate to="/dmca" replace /> },
      { path: "Role", element: <Navigate to="/terms" replace /> },
      { path: "CommonQuestion", element: <Navigate to="/faq" replace /> },
    ],
  },
]);
