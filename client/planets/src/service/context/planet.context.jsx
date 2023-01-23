import { createContext, useState } from "react";

export const PlanetContext = createContext({
  planet: {},
  setPlanetContext: () => {},
  planets: {},
  setPlanetsContext: () => {},
});

export const PlanetProvider = ({ children }) => {
  const [planetContext, setPlanet] = useState();
  const [planetsContext, setPlanets] = useState();
  const setPlanetContext = (planet) => {
    console.log("CONTEXT", planet);
    setPlanet(planet);
  };
  const setPlanetsContext = (planets) => {
    console.log("CONTEXT PLANTES", planets);
    setPlanets(planets);
  };
  const value = {
    planetContext,
    planetsContext,
    setPlanetContext,
    setPlanetsContext,
  };
  return (
    <PlanetContext.Provider value={value}>{children}</PlanetContext.Provider>
  );
};
