import Layout from "../_layout";
import DashboardDataCard from "../../components/DashboardDataCard";
import {
  faDirections,
  faPlusCircle,
  faRoad,
  faRoute,
} from "@fortawesome/free-solid-svg-icons";
import "./RoutesPage.css";
import RoutePreviewCard from "../../components/RoutePreviewCard";
import SectionHeader from "../../components/SectionHeader";
import Button from "../../components/Button";
import TriggerableDialog from "../../components/TriggerableDialog";
import CreateRouteForm from "@/forms/CreateRouteForm";
import RoutesTable from "../../components/RoutesTable";
import { useRoute } from "../../hooks/useRoute";

export default function RoutesPage() {
  const {
    useGetRoutesCount,
    useGetActiveRoutesCount,
    useGetInactiveRoutesCount,
  } = useRoute();
  const { data: routesCount } = useGetRoutesCount;
  const { data: activeRoutesCount } = useGetActiveRoutesCount;
  const { data: inactiveRoutesCount } = useGetInactiveRoutesCount;

  const routes = routesCount?.count ?? 0;
  const activeRoutes = activeRoutesCount?.count ?? 0;
  const inactiveRoutes = inactiveRoutesCount?.count ?? 0;

  function handleDelete(id: number): void {
    throw new Error("Function not implemented.");
  }

  function handleEdit(id: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Layout>
      <div className="content-container">
        <div className="data-summarization-container">
          <DashboardDataCard label="Rotas" value={routes} icon={faDirections} />
          <DashboardDataCard
            label="Rotas Ativas"
            value={activeRoutes}
            icon={faRoad}
          />
          <DashboardDataCard
            label="Rotas Inativas"
            value={inactiveRoutes}
            icon={faRoad}
          />
        </div>
        <SectionHeader
          title="Rotas (Preview)"
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
        <div className="routes-table-container">
          <div className="routes-table-action-buttons-container">
            <SectionHeader icon={faRoute} title="Rotas" />
            <div className="action-buttons">
              <TriggerableDialog
                title="Cadastrar Rota"
                form={<CreateRouteForm />}
              >
                <Button
                  text="Criar"
                  icon={faPlusCircle}
                  iconColor="#FFF"
                  onClick={() => {}}
                  title="cadastrar nova rota"
                />
              </TriggerableDialog>
            </div>
          </div>
          <div className="routes-table-box">
            <RoutesTable
              onDelete={(id: number) => handleDelete(id)}
              onEdit={(id: number) => handleEdit(id)}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
