import { useState, useEffect, useContext } from "react";
import { PlanetContext } from "../context/planet.context";

const useAxios = (configObj) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState();

  const { setPlanetContext, setPlanetsContext } = useContext(PlanetContext);

  const axiosFetch = async (configObj) => {
    const { axiosInstance, method, url, data } = configObj;
    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      const res = await axiosInstance[method.toLowerCase()](url, {
        ...data,
        // signal: ctrl.signal,
      });
      let dataRes = res.data;
      if (dataRes.length) {
        setPlanetsContext(dataRes);
      } else {
        setPlanetContext(dataRes);
      }

      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => controller && controller.abort();
  }, [controller]);

  return [error, loading, axiosFetch];
};

export default useAxios;
