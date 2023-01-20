import "./planets-card.component.style.scss";

const PlanetsCard = (props) => {
  return <div className="planets-card-wrapper">{props.planet}</div>;
};

export default PlanetsCard;
