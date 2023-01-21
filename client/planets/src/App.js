import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import PlanetsHeader from "./components/planets-header/planets-header.component";
import SinglePlanet from "./routes/single-planet/single-planet.component";
import PlanetsOverview from "./routes/planets-overview/planets-overview.route";

function App() {
  // useEffect(() => {
  //   fetch("http://localhost:3001/api/planets")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message));
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<PlanetsHeader />}>
        <Route path="/" element={<PlanetsOverview />}></Route>
        <Route path="/:id" element={<SinglePlanet />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
