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
  return (
    <>
      <Sidebar style={{ width: "250px", flexShrink: 0 }}>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent style={{ paddingLeft: 18,paddingTop: 50 }}>
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
