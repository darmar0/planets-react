import { useContext } from "react";
import { ViewContext } from "../../service/context/view.context";
import useAxios from "../../service/axios/useAxios.service";
import axios from "../../service/axios/planets.api";
import PlanetsGrid from "../../components/planets-grid/planets-grid.component";
import PlanetsTable from "../../components/planets-table/planets-table.component";
import PlanetsHeader from "../../components/planets-header/planets-header.component";
import "./planets-overview.route.style.scss";

const PlanetsOverview = () => {
  const { view } = useContext(ViewContext);
  const [planets, error, loading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/",
  });
  return (
    <div className="planets-overview-wraper">
      {loading && <p>loading</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && planets && view === "grid" ? (
        <PlanetsGrid planets={planets}></PlanetsGrid>
      ) : (
        <PlanetsTable planets={planets}></PlanetsTable>
      )}
      {!loading && !error && !planets && <p>No planets to display</p>}
    </div>
  );
};

export default PlanetsOverview;
