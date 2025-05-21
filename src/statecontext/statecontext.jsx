import React, { createContext, useContext, useEffect, useState } from "react";
import { getHoldings } from "../API/Holdings/holdingsapi";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [checked, setChecked] = useState([]);
  const [holdings, setHoldings] = useState([]);

  const checking = (coin, event) => {
    if (event.target.checked) {
      setChecked((prev) => [...prev, coin]);
    } else {
      setChecked((prev) => prev.filter((c) => c !== coin));
    }
  };

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const data = await getHoldings();
        setHoldings(data);
      } catch (err) {
        console.error("Failed to fetch holdings", err);
      }
    };

    fetchHoldings();
  }, []);

  return (
    <StateContext.Provider value={{ checked, checking, holdings }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
