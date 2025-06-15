import React from "react";
import Navbar from "../ui/Navbar/Navbar";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <main>
      <Navbar />
      <div className="mt-6">{children}</div>
    </main>
  );
}
