import { Sheet } from "@mui/joy";
import { ReactNode } from "react";
import Header from "../components/Header";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Sheet>{children}</Sheet>
    </>
  );
}
