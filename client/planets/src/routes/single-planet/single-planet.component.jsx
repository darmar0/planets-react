import "./single-planet.component.style.scss";
import { useParams } from "react-router-dom";
import useAxios from "../../service/axios/useAxios.service";
import axios from "../../service/axios/planets.api";
import { useEffect, useContext } from "react";
import { PlanetContext } from "../../service/context/planet.context";
import { useState } from "react";

const SinglePlanet = () => {
  const { id } = useParams();
  const { planetContext } = useContext(PlanetContext);
  const [error, loading, axiosFetch] = useAxios();
  const getPlanet = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: `/${id}`,
    });
  };

  useEffect(() => {
    getPlanet();
  }, []);
  return (
    <div className="single-planet-wrapper">
      {loading && <p>loading</p>}
      {!loading && error && <p>{planetContext.error.message}</p>}
      {!loading && !error && planetContext && (
        <div className="planet-info-grid">
          <div className="planet-info-box name-description">
            <img
              src={planetContext.imageUrl}
              alt={planetContext.planetName}
              className="single-planet-img"
            ></img>
            <span>
              <h1>{planetContext.planetName}</h1>
              <p>{planetContext.description}</p>
            </span>
          </div>
          <div className="planet-info-box md">
            <h3>{planetContext.planetRadiusKM}</h3>
            <p>Radius in km </p>
          </div>
          <div className="planet-info-box sm">
            <h3>{planetContext?.distInMillionsKM?.fromSun}</h3>
            <p>Dist. from Sun</p>
          </div>
          <div className="planet-info-box md">
            <h3>{planetContext.planetColor}</h3>
            <p>Color</p>
          </div>
          <div className="planet-info-box sm">
            <h3>{planetContext?.distInMillionsKM?.fromEarth}</h3>
            <p>Dist. from Earth</p>
          </div>
        </div>
      )}
      {!loading && !error && !planetContext && <p>No planet to display</p>}
    </div>
  );
};

export default SinglePlanet;
