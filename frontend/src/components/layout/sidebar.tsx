import { Button } from "@/components/elements/button";
import Link from "@/components/elements/link";
import { appInfo, iconSizes } from "@/lib/config";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronsLeftIcon, CircleDotIcon, CircleIcon, MenuIcon } from "lucide-react";
import { createContext, ElementRef, useContext, useEffect, useReducer, useRef } from "react";
import { useLocation } from "react-router-dom";

type ContextValueProps = {
  isOpen: boolean;
  transition: boolean;
  dispatch: React.Dispatch<Action>;
};

type State = { isOpen: boolean; transition: boolean };
type Action =
  | {
      type: "open" | "collapse";
      payload: { refCurrent: HTMLElement; width: string };
    }
  | { type: "stopTransition" };

const SidebarContext = createContext<ContextValueProps | null>(null);

const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
};

export function Sidebar({ children }: { children: React.ReactNode }) {
  const initialState = { isOpen: false, transition: false };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "open": {
        action.payload.refCurrent.style.width = action.payload.width;
        return { isOpen: true, transition: true };
      }
      case "collapse": {
        action.payload.refCurrent.style.width = action.payload.width;
        return { isOpen: false, transition: true };
      }
      case "stopTransition":
        return { ...state, transition: false };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SidebarContext.Provider value={{ ...state, dispatch }}>
      <SidebarContent>{children}</SidebarContent>
    </SidebarContext.Provider>
  );
}

const width = {
  mobile: {
    open: "100vw",
    collapse: "0",
  },
  desktop: {
    open: "240px",
    collapse: "60px",
  },
};

type SideMenuProps = {} & React.ComponentProps<"aside">;

const SidebarContent = (props: SideMenuProps) => {
  const { isOpen, transition, dispatch } = useSidebar();

  const isMobile = useIsMobile();
  const sidebarRef = useRef<ElementRef<"aside">>(null);

  useEffect(() => {
    if (!sidebarRef.current) return;
    dispatch({
      type: isOpen ? "open" : "collapse",
      payload: {
        refCurrent: sidebarRef.current,
        width: width[isMobile ? "mobile" : "desktop"][isOpen ? "open" : "collapse"],
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const changeState = (action: "open" | "collapse") => {
    if (!sidebarRef.current) return;
    dispatch({
      type: action,
      payload: {
        refCurrent: sidebarRef.current,
        width: width[isMobile ? "mobile" : "desktop"][action],
      },
    });
    setTimeout(() => dispatch({ type: "stopTransition" }), 300);
  };

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        "group/sidebar bg-background text-foreground sticky top-0 z-10 flex h-screen flex-col gap-2 border-r",
        transition && "transition-all duration-300 ease-in-out",
        props.className
      )}
      style={{
        width: width[isMobile ? "mobile" : "desktop"][isOpen ? "open" : "collapse"],
      }}
    >
      <div className="flex h-16 min-h-16 items-center justify-between border-b p-3">
        <Button
          size="icon"
          variant={isOpen ? "outline" : "ghost"}
          onClick={isOpen ? () => changeState("collapse") : () => changeState("open")}
          className="shrink-0"
        >
          {isOpen ? <ChevronsLeftIcon size={iconSizes.md} /> : <MenuIcon size={iconSizes.md} />}
        </Button>

        {isOpen && (
          <motion.h1
            className="block truncate pr-2 text-xl font-semibold capitalize"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {appInfo.name}
          </motion.h1>
        )}
      </div>

      <ul className="flex flex-col gap-2 p-3">{props.children}</ul>
    </aside>
  );
};

type SidebarLinkProps = {
  to: string;
  icon?: React.ReactNode;
  label: string;
  children?: React.ReactNode;
};

export function SidebarLink({ to, label, icon, children }: SidebarLinkProps) {
  const { isOpen } = useSidebar();
  return (
    <li>
      <Link
        to={to}
        asButton
        variant="outline"
        size={isOpen ? "sm" : "icon"}
        className={cn(
          "w-full",
          isOpen ? "justify-start" : "justify-center",
          isOpen && children ? "rounded-b-none" : "rounded-md"
        )}
      >
        {icon}

        {isOpen ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {label}
          </motion.span>
        ) : (
          <span className="sr-only">{label}</span>
        )}
      </Link>
      {children && isOpen && <ul className="flex flex-col">{children}</ul>}
    </li>
  );
}

type SidebarSubLinkProps = {
  to: string;
  label: string;
};

export function SidebarSubLink({ to, label }: SidebarSubLinkProps) {
  const { pathname } = useLocation();
  return (
    <Link
      to={to}
      asButton
      variant="outline"
      size="sm"
      className="w-full justify-start rounded-none border-t-0 last:rounded-b-md last:border-b"
    >
      {pathname === to ? <CircleDotIcon size={iconSizes.sm} /> : <CircleIcon size={iconSizes.sm} />}

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        {label}
      </motion.span>
    </Link>
  );
}
