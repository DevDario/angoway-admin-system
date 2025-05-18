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
import CreateRouteForm from "../../src/forms/CreateRouteForm";
import RoutesTable from "../../components/RoutesTable";
import {
  useDeleteRoute,
  useUpdateRoute,
} from "../../hooks/route/useRouteMutations";
import {
  useGetRoutesCount,
  useGetActiveRoutesCount,
  useGetInactiveRoutesCount,
  useGetPreviewRoutes,
} from "../../hooks/route/useRouteQuerys";

export default function RoutesPage() {

  const { data: numRoutes } = useGetRoutesCount();
  const { data: activeRoutes } = useGetActiveRoutesCount();
  const { data: inactiveRoutes } = useGetInactiveRoutesCount();
  const { data: routesData } = useGetPreviewRoutes();

  const { mutate: deleteRoute } = useDeleteRoute();
  const { mutate: updateRoute } = useUpdateRoute();

  const routesCount = numRoutes?.count ?? 0;
  const activeRoutesCount = activeRoutes?.count ?? 0;
  const inactiveRoutesCount = inactiveRoutes?.count ?? 0;
  const routes = Array.isArray(routesData) ? routesData : [];



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
          <DashboardDataCard
            label="Rotas"
            value={routesCount}
            icon={faDirections}
          />
          <DashboardDataCard
            label="Rotas Ativas"
            value={activeRoutesCount}
            icon={faRoad}
          />
          <DashboardDataCard
            label="Rotas Inativas"
            value={inactiveRoutesCount}
            icon={faRoad}
          />
        </div>
        <SectionHeader
          title="Rotas (Preview)"
          icon={faRoute}
          key={"preview-routes-section"}
        />
        <div className="routes-card-container">
          {routes.map((route, index) => (
            <RoutePreviewCard
              name={route.name}
              destination={route.destination}
              origin={route.origin}
              status={route.status}
              key={index}
              stops={route.stops}
              schedules={route.schedules}
            />
          ))}

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
