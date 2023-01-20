import PlanetsCard from "../planets-card/planets-card.component";
import "./planets-grid.component.style.scss";

const PlanetsGrid = () => {
  const planets = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="planets-grid-wrapper">
      {planets.map((planet) => (
        <PlanetsCard planet={planet} key={planet}></PlanetsCard>
      ))}
    </div>
  );
};

export default PlanetsGrid;
