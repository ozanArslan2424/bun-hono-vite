export const appInfo = {
  name: "App",
  description: "The main app component",
  createdAt: "2024-10-23",
};

export const iconSizes = {
  xxs: 8,
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const navLinks = {
  protected: [],
  public: [
    { to: "/about", label: "About" },
    { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact" },
  ],
};

export const userLinks = [
  { to: "/profile", label: "Profile" },
  { to: "/settings", label: "Settings" },
];

export const publicRoutes = ["/", "/about", "/privacy", "/tos"];
export const protectedRoutes = ["/dashboard", "/profile", "/settings"];
