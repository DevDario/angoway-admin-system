import { ReactNode } from "react";
import AppSidebar from "../components/AppSideBar";
import { SidebarProvider, SidebarTrigger } from "../src/components/ui/sidebar";
import { Toaster } from "../src/components/ui/sonner";

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <SidebarProvider>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          width: "100vw",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "fixed",
            left: "22px",
            top: "10px",
            zIndex: 100,
          }}
        >
          <SidebarTrigger
            style={{
              background: "#0C6BFF",
              borderRadius: "50%",
              padding: "10px",
              cursor: "pointer",
            }}
          />
        </div>

        <AppSidebar />
        <main
          style={{
            flex: 1,
            overflow: "auto",
            padding: "1rem",
            marginLeft: "10px",
            transition: "margin 0.3s ease",
          }}
        >
          <Toaster richColors position="top-center" />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
