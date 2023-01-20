import PlanetsGrid from "../../components/planets-grid/planets-grid.component";
import PlanetsHeader from "../../components/planets-header/planets-header.component";
import "./planets-overview.route.style.scss";

const PlanetsOverview = () => {
  return (
    <div className="planets-overview-wraper">
      <PlanetsHeader></PlanetsHeader>
      <PlanetsGrid></PlanetsGrid>
    </div>
  );
};

export default PlanetsOverview;
