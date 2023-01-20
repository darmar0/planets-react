import React, { useState, useEffect } from "react";
import "./App.css";
import PlanetsOverview from "./routes/planets-overview/planets-overview.route";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/planets")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <PlanetsOverview />
    </div>
  );
}

export default App;
