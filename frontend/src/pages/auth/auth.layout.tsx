import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex flex-1 items-center justify-center pt-16">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Outlet />
      </div>
    </div>
  );
}
