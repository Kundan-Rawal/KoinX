import axios from "axios";

export const getHoldings = async () => {
  const response = await axios.get("/api/holdings");
  return response.data;
};
