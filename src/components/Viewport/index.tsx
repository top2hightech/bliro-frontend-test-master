import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Viewport({children}: LayoutProps) {
  return (
    <div className="p-4 md:px-8 max-w-7xl mx-auto">
      {children}
    </div>
  )
}