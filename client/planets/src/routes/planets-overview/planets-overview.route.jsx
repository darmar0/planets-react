import { useContext, useEffect } from "react";
import { ViewContext } from "../../service/context/view.context";
import useAxios from "../../service/axios/useAxios.service";
import axios from "../../service/axios/planets.api";
import PlanetsGrid from "../../components/planets-grid/planets-grid.component";
import PlanetsTable from "../../components/planets-table/planets-table.component";
import "./planets-overview.route.style.scss";
import { useSearchParams } from "react-router-dom";
import { PlanetContext } from "../../service/context/planet.context";

const PlanetsOverview = () => {
  const { view } = useContext(ViewContext);
  const [searchParams] = useSearchParams();
  let param = searchParams.get("search");
  const { planetsContext } = useContext(PlanetContext);
  const [error, loading, axiosFetch] = useAxios();
  const getPlanets = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/",
    });
  };
  useEffect(() => {
    getPlanets();
  }, []);
  const filterPlanets = (planets) => {
    if (param) {
      return planets.filter((planet) =>
        planet.planetName.toLowerCase().includes(param.toLowerCase())
      );
    } else {
      return planets;
    }
  };
  return (
    <div className="planets-overview-wraper">
      {loading && <p>loading</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && planetsContext && view === "grid" ? (
        <PlanetsGrid planets={filterPlanets(planetsContext)}></PlanetsGrid>
      ) : (
        <PlanetsTable planets={filterPlanets(planetsContext)}></PlanetsTable>
      )}
      {!loading && !error && !planetsContext && <p>No planets to display</p>}
    </div>
  );
};

export default PlanetsOverview;
