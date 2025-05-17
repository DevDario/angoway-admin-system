import Layout from "../_layout";
import DashboardDataCard from "../../components/DashboardDataCard";
import {
  faDirections,
  faRoad,
  faRoute,
} from "@fortawesome/free-solid-svg-icons";
import "./RoutesPage.css";
import RoutePreviewCard from "../../components/RoutePreviewCard";
import SectionHeader from "../../components/SectionHeader";

export default function RoutesPage() {
  return (
    <Layout>
      <div className="content-container">
        <div className="data-summarization-container">
          <DashboardDataCard label="Rotas" value={0} icon={faDirections} />
          <DashboardDataCard label="Rotas Ativas" value={0} icon={faRoad} />
          <DashboardDataCard label="Rotas Inativas" value={0} icon={faRoad} />
        </div>
        <SectionHeader
          title="Rotas"
          icon={faRoute}
          key={"preview-routes-section"}
        />
        <div className="routes-card-container">
          <RoutePreviewCard
            destination={{ lat: -9.0037, lng: 13.2732 }}
            origin={{ lat: -8.8383, lng: 13.2344 }}
            name="Luanda to Viana"
            status="active"
            key={"Luanda Central para Viana"}
            stops={[
              { name: "Luanda", routeId: 0 },
              { name: "Viana", routeId: 0 },
            ]}
            schedules={[
              {
                departureTime: "07:00",
                arrivalTime: "07:45",
              },
              {
                departureTime: "09:00",
                arrivalTime: "09:45",
              },
              {
                departureTime: "17:00",
                arrivalTime: "17:45",
              },
            ]}
          />
          <RoutePreviewCard
            destination={{ lat: -9.0037, lng: 13.2732 }}
            origin={{ lat: -8.8383, lng: 13.2344 }}
            name="Luanda to Viana"
            status="active"
            key={"Luanda Central para Viana"}
            stops={[
              { name: "Luanda", routeId: 0 },
              { name: "Viana", routeId: 0 },
            ]}
            schedules={[
              {
                departureTime: "07:00",
                arrivalTime: "07:45",
              },
              {
                departureTime: "09:00",
                arrivalTime: "09:45",
              },
              {
                departureTime: "17:00",
                arrivalTime: "17:45",
              },
            ]}
          />
        </div>
      </div>
    </Layout>
  );
}
