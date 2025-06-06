import {
  User2,
  Home,
  Bus,
  Settings,
  RouteIcon,
  LocateFixedIcon,
  MessageSquareWarning,
  Map as MapIcon,
  DoorOpen,
} from "lucide-react";
import { Link } from "react-router";

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
import { useGetProfileDetails } from "../hooks/profile/useProfileQuerys";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { ProfileDetails } from "types/profile-details-response";

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
    title: "Alertas",
    url: "/alerts",
    icon: MessageSquareWarning,
  },
  {
    title: "Mapa",
    url: "/map",
    icon: MapIcon,
  },
  {
    title: "Configurações",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Sair",
    url: "/",
    icon: DoorOpen,
    fn: () => {
      localStorage.removeItem("access_token");
      window.location.reload();
    },
  },
];

export default function AppSidebar() {
  const { open, setOpen } = useSidebar();
  const [profile, setProfile] = useState<ProfileDetails | null>(null);
  const { data: profileDetails } = useGetProfileDetails();

  useEffect(() => {
    if (profileDetails !== undefined) setProfile(profileDetails);
  }, [profileDetails]);

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
          onClick={() => setOpen(false)}
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
            <SidebarGroupContent style={{ paddingLeft: 9, paddingTop: 50 }}>
              <SidebarMenu style={{ paddingRight: 10 }}>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title} style={{ marginTop: 10 }}>
                    <SidebarMenuButton
                      asChild
                      style={{ padding: 20 }}
                      onClick={item.fn}
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem key={"profile-card"} style={{ marginTop: 70 }}>
                  <SidebarMenuButton
                    asChild
                    style={{ padding: 20 }}
                    onClick={() => {}}
                  >
                    <Link to={""}>
                      <div
                        className="profile-card"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "10px",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          className="profile-avatar"
                          style={{
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {profile?.url_foto_de_perfil ? (
                            <img
                              src={profile.url_foto_de_perfil}
                              alt="eu"
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "8px",
                              }}
                            />
                          ) : (
                            <div>
                              <FontAwesomeIcon
                                icon={faUser}
                                width="15"
                                height="15"
                                color="#FCFCFB"
                              />
                            </div>
                          )}
                        </div>
                        <div
                          className="profile-name"
                          style={{
                            display: "flex",
                            alignContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <h1>{profile?.name}</h1>
                        </div>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
