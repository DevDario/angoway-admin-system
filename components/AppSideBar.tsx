import {
  User2,
  Home,
  Bus,
  Settings,
  RouteIcon,
  LocateFixedIcon,
} from "lucide-react";
import { Link } from "react-router";
import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../src/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Pagina Inicial",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Motoristas",
    url: "/drivers",
    icon: User2,
  },
  {
    title: "Autocarros",
    url: "/buses",
    icon: Bus,
  },
  {
    title: "Rotas",
    url: "/routes",
    icon: RouteIcon,
  },
  {
    title: "Paragens",
    url: "/stops",
    icon: LocateFixedIcon,
  },
  {
    title: "Configurações",
    url: "/settings",
    icon: Settings,
  },
];

export default function AppSidebar() {
  const { open } = useSidebar();
  return (
    <>
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 40,
            cursor: "pointer",
          }}
        />
      )}
      <Sidebar
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "250px",
          zIndex: 50,
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
        }}
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent style={{ paddingLeft: 18, paddingTop: 50 }}>
              <SidebarMenu style={{ paddingRight: 10 }}>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild style={{ padding: 10 }}>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
