import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { RoutePreviewResponse } from "../types/route.preview.response";
import "./RoutePreviewCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBusSimple,
  faClock,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../utils/date-time-formatter";
import ElementsListingDialog from "../components/ElementsListingDialog";
import { toast } from "sonner";
import { useGetSchedules } from "../hooks/schedule/useSchedulesQuerys";
import { useEffect, useState } from "react";
import { useAssignSchedule } from "../hooks/route/useRouteMutations";
import { CirclePlusIcon } from "lucide-react";
import { Schedule } from "types/Schedule";

export default function RoutePreviewCard({
  id,
  name,
  origin,
  destination,
  status,
  routeStops,
  schedules,
}: RoutePreviewResponse) {
  const customIcon = new L.Icon({
    iconUrl: "/busStopIcon.png",
    iconSize: [32, 32],
  });

  
  const { mutateAsync: assign } = useAssignSchedule();
  const { data: fetchedSchedules } = useGetSchedules();

  const [schedulesList, setSchedulesList] = useState<
    { prop: string; value: string }[]
  >([]);

  useEffect(() => {
    if (fetchedSchedules && Array.isArray(fetchedSchedules)) {
      const schedules = (fetchedSchedules as Schedule[])
        .filter((schedule) => typeof schedule?.departureTime === "string")
        .map((schedule) => ({
          prop: `${formatDate(new Date(schedule.departureTime))} - ${formatDate(
            new Date(schedule.arrivalTime)
          )}`,
          value: schedule.id + "",
        }));
      setSchedulesList(schedules);
    } else {
      setSchedulesList([]);
    }
  }, [fetchedSchedules]);

  async function handleAssignSchedule(scheduleId: string, routeId: string) {
    await assign({
      scheduleId: Number(scheduleId),
      routeId: Number(routeId),
    }).then((res) => {
      if (res.code === 200) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  }

  return (
    <div className="route-preview-card">
      <div className="route-preview-card-header">
        <h1 className="route-preview-card-title">{name}</h1>
        <div className="route-preview-card-details-title route-status ">
          <p>{status}</p>
        </div>
      </div>
      <div className="route-preview-card-container">
        <div className="route-preview-card-map">
          <MapContainer
            center={[destination.lat ?? 0, destination.lng ?? 0]}
            zoom={14}
            style={{
              height: "200px",
              width: "100%",
              borderRadius: "8px",
              zIndex: "-1",
            }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />
            <Marker
              key={"route-origin-point"}
              position={[origin.lat ?? 0, origin.lng ?? 0]}
              icon={customIcon}
            >
              <Popup>Ponto de Partida</Popup>
            </Marker>
            <Marker
              key={"route-destination-point"}
              position={[destination.lat ?? 0, destination.lng ?? 0]}
              icon={customIcon}
            >
              <Popup>Fim da Rota</Popup>
            </Marker>
            <Polyline
              positions={[
                [origin.lat ?? 0, origin.lng ?? 0],
                [destination.lat ?? 0, destination.lng ?? 0],
              ]}
              pathOptions={{ color: "#0C6BFF", weight: 4 }}
            />
          </MapContainer>
        </div>
        <div className="route-preview-card-details">
          <div className="route-preview-card-details-container">
            <div className="route-stops-container">
              <h2 className="stops-details-title route-preview-card-details-title">
                <FontAwesomeIcon
                  icon={faBusSimple}
                  color="#FCFCFB"
                  width={11}
                  height={11}
                />{" "}
                Paragens
              </h2>
              <ol className="stops-list">
                {routeStops.length > 0 ? (
                  routeStops.map((stop, index) => (
                    <li className="stops-list-item" key={index}>
                      {stop.stop.name}
                    </li>
                  ))
                ) : (
                  <p>Sem paragens</p>
                )}
              </ol>
            </div>
            <div className="route-schedules-container">
              <h2 className="schedules-details-title route-preview-card-details-title">
                <FontAwesomeIcon
                  icon={faClock}
                  color="#FCFCFB"
                  width={11}
                  height={11}
                />{" "}
                Horários
              </h2>
              <ol className="schedules-list">
                {schedules.length > 0 &&
                  schedules.map((schedule, index) => (
                    <li className="schedules-list-item" key={index}>
                      {formatDate(new Date(schedule.departureTime)) +
                        " - " +
                        formatDate(new Date(schedule.arrivalTime))}
                    </li>
                  ))}
                <ElementsListingDialog
                  dialogLabel="Horários Registados"
                  dialogTitle="Atribuir Horários"
                  emptyStateText="Nenhum horário disponível."
                  buttonText="Atribuir"
                  action={(selected) =>
                    handleAssignSchedule(selected.value || "", id + "")
                  }
                  data={schedulesList}
                >
                  <button
                    className="action-button"
                    style={{
                      marginTop: "4px",
                      display: "flex",
                      gap: "5px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    <CirclePlusIcon color="#0C6BFF" size={18} />
                    Atribuir
                  </button>
                </ElementsListingDialog>
              </ol>
            </div>
            <div className="route-details-container">
              <h2 className="route-details-title route-preview-card-details-title">
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  color="#FCFCFB"
                  width={11}
                  height={11}
                />{" "}
                Detalhes
              </h2>
              <ul className="route-details-list">
                <li className="route-details-list-item">
                  <strong>Paragens:</strong> {routeStops.length}
                </li>
                <li className="route-details-list-item">
                  <strong>Horários:</strong> {schedules.length}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
