import { createContext, useState } from "react";

export const ViewContext = createContext({
  view: "",
  handleView: () => {},
});

export const ViewProvider = ({ children }) => {
  const [view, setView] = useState("grid");
  const handleView = (str) => {
    console.log(str);
    setView(str);
  };
  const value = { view, handleView };
  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>;
};
