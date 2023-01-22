import { useState, useEffect } from "react";

const useAxios = (configObj) => {
  const [responce, setResponce] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState();

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
      console.log(res);
      setResponce(res.data);
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

  return [responce, error, loading, axiosFetch];
};

export default useAxios;
