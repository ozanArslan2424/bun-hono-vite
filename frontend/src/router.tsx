import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./pages/auth/auth.layout";
import AuthPage from "./pages/auth/auth.page";
import NotFoundPage from "./pages/not-found";
import Providers from "./pages/providers";
import IndexPage from "./pages/public/index.page";
import PublicLayout from "./pages/public/public.layout";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFoundPage />,
    element: <Providers />,
    children: [
      {
        path: "/",
        element: <PublicLayout />,
        children: [
          {
            path: "/",
            element: <IndexPage />,
          },

          {
            path: "/about",
            // element: <AboutPage />,
          },
          {
            path: "/contact",
            // element: <ContactPage />,
          },
          {
            path: "/tos",
            // element: <TOSPage />,
          },
        ],
      },
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            path: "/auth",
            element: <AuthPage />,
          },
          {
            path: "/auth/forgot-password",
            // element: <ForgotPasswordPage />,
          },
          {
            path: "/auth/reset-password",
            // element: <ResetPasswordPage />,
          },
          {
            path: "/auth/verify-email",
            // element: <VerifyEmailPage />,
          },
        ],
      },
      {
        path: "/",
        // element: <ProtectedLayout />,
        children: [
          {
            path: "/dashboard",
            // element: <DashboardPage />,
          },
          {
            path: "/settings",
            // element: <SettingsPage />,
          },
          {
            path: "/user/:userId",
            // element: <UserPage />,
          },
        ],
      },
    ],
  },
]);
