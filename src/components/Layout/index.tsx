import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({children}: LayoutProps) {
  return (
    <main className="bg-gray-100 min-h-screen">
      {children}
    </main>
  )
}