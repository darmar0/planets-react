import "./planets-card.component.style.scss";
import { useNavigate } from "react-router-dom";

const PlanetsCard = (props) => {
  const planet = props.planet;
  const navigate = useNavigate();

  const onNavigate = () => navigate(`/${planet.id}`);
  return (
    <div className="planets-card-wrapper" onClick={onNavigate}>
      <img src={planet.imageUrl} className="planet-img"></img>
      <h1>{planet.planetName}</h1>
      <p className="planet-desc">{planet.description}</p>
      <div className="planet-info">
        <span className="info-l">
          <h4>{planet.planetColor}</h4>
          <p className="planet-desc">Color</p>
        </span>
        <span className="info-r">
          <h4>{planet.distInMillionsKM.fromSun}</h4>
          <p className="planet-desc">Dist.from Sun</p>
        </span>
        <span className="info-l">
          <h4>{planet.planetRadiusKM}</h4>
          <p className="planet-desc">Radius in km</p>
        </span>
        <span className="info-r">
          <h4>{planet.distInMillionsKM.fromEarth}</h4>
          <p className="planet-desc">Dist.from Earth </p>
        </span>
      </div>
    </div>
  );
};

export default PlanetsCard;
