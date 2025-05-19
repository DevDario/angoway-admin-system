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
  useUpdateRouteStatus,
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
  const { mutate: updateRouteStatus } = useUpdateRouteStatus();

  const routesCount = numRoutes?.count ?? 0;
  const activeRoutesCount = activeRoutes?.count ?? 0;
  const inactiveRoutesCount = inactiveRoutes?.count ?? 0;
  const routes = Array.isArray(routesData) ? routesData : [];

  function handleDelete(id: number): void {
    deleteRoute(id);
  }

  function handleEdit(id: number): void {
    updateRouteStatus(id);
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
          {routes.length > 0 ? (
            routes.map((route, index) => (
              <RoutePreviewCard
                key={index}
                name={route.name}
                destination={route.destination}
                origin={route.origin}
                status={route.status}
                stops={route.stops}
                schedules={route.schedules}
              />
            ))
          ) : (
            <div className="empty-state-message">Sem rotas preview</div>
          )}
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
