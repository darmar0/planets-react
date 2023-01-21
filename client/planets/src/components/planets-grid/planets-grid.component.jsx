import PlanetsCard from "../planets-card/planets-card.component";
import "./planets-grid.component.style.scss";

const PlanetsGrid = (props) => {
  return (
    <div className="planets-grid-wrapper">
      {props.planets.map((planet) => (
        <PlanetsCard planet={planet} key={planet.id}></PlanetsCard>
      ))}
    </div>
  );
};

export default PlanetsGrid;
