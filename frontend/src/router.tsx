import {
  Layout,
  NotFoundPage,
  AuthLayout,
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  VerifyEmailPage,
  BookPage,
  DashboardPage,
  SettingsPage,
  BookLayout,
  AboutPage,
  ContactPage,
  LandingPage,
  TOSPage,
} from "./pages";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/terms-of-service",
        element: <TOSPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/book",
        element: <BookLayout />,
        children: [{ path: "/book/:bookId", element: <BookPage /> }],
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
          {
            path: "/forgot-password",
            element: <ForgotPasswordPage />,
          },
          {
            path: "/reset-password",
            element: <ResetPasswordPage />,
          },
          {
            path: "/verify-email",
            element: <VerifyEmailPage />,
          },
        ],
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
