// components/NavbarWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

const HIDDEN_PATHS = ["/auth/signin", "/auth/signup"];

export default function NavbarWrapper() {
  const pathname = usePathname();

  const shouldHideNavbar = HIDDEN_PATHS.includes(pathname);

  if (shouldHideNavbar) return null;

  return <Navbar />;
}
