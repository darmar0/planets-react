import "./single-planet.component.style.scss";
import { useParams } from "react-router-dom";
import useAxios from "../../service/axios/useAxios.service";
import axios from "../../service/axios/planets.api";

const SinglePlanet = () => {
  const { id } = useParams();
  const [planet, error, loading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: `/${id}`,
  });
  return (
    <div className="single-planet-wrapper">
      {loading && <p>loading</p>}
      {!loading && error && <p>{planet.error.message}</p>}
      {!loading && !error && planet && (
        <div className="planet-info-grid">
          <div className="planet-info-box name-description">
            <img
              src={planet.imageUrl}
              alt={planet.planetName}
              className="single-planet-img"
            ></img>
            <span>
              <h1>{planet.planetName}</h1>
              <p>{planet.description}</p>
            </span>
          </div>
          <div className="planet-info-box md">
            <h3>{planet.planetRadiusKM}</h3>
            <p>Radius in km </p>
          </div>
          <div className="planet-info-box sm">
            <h3>{planet?.distInMillionsKM?.fromSun}</h3>
            <p>Dist. from Sun</p>
          </div>
          <div className="planet-info-box md">
            <h3>{planet.planetColor}</h3>
            <p>Color</p>
          </div>
          <div className="planet-info-box sm">
            <h3>{planet?.distInMillionsKM?.fromEarth}</h3>
            <p>Dist. from Earth</p>
          </div>
        </div>
      )}
      {!loading && !error && !planet && <p>No planet to display</p>}
    </div>
  );
};

export default SinglePlanet;
