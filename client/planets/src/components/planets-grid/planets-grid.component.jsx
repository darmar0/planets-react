import { useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";

import PlanetsCard from "../planets-card/planets-card.component";
import "./planets-grid.component.style.scss";

const PlanetsGrid = (props) => {
  console.log("PLANETS GRID", props.planets);
  return (
    <div className="planets-grid-wrapper">
      {props.planets.map((planet) => (
        <PlanetsCard planet={planet} key={planet.id}></PlanetsCard>
      ))}
    </div>
  );
};

export default PlanetsGrid;
