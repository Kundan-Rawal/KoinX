import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Avatar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useStateContext } from "../../statecontext/statecontext";
import { getHoldings } from "../../API/Holdings/holdingsapi";

const formatCurrency = (num) =>
  num.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 6,
  });

const CryptoHoldingsTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { checked, checking, holdings } = useStateContext();

  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getNestedValue = (obj, path) =>
    path.split(".").reduce((o, key) => (o ? o[key] : null), obj);

  const sortedData = [...holdings].sort((a, b) => {
    const getValue = (item) => {
      switch (sortField) {
        case "coinName":
          return item.coinName;
        case "currentPrice":
          return item.currentPrice;
        case "stcg.gain":
          return item.stcg.gain;
        case "ltcg.gain":
          return item.ltcg.gain;
        case "totalValue":
          return item.totalHolding * item.currentPrice;
        default:
          return 0;
      }
    };

    const aVal = getValue(a);
    const bVal = getValue(b);

    if (typeof aVal === "string") {
      return sortOrder === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    } else {
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    }
  });

  return (
    <div className="bg-[#1f2a376d] p-2 rounded-2xl mt-4">
      <h2 className="text-lg font-semibold text-white ml-3 mt-2">Holdings</h2>
      <TableContainer
        component={Paper}
        sx={{
          background: "#1c1c2a",
          color: "white",
          overflowX: "auto",
          marginTop: "20px",
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ background: "#0A0A12" }}>
              <TableCell sx={{ color: "white" }}>
                <div className="flex items-center">
                  <Checkbox sx={{ color: "#A9AFC5", marginRight: "20px" }} />
                  <p
                    onClick={() => handleSort("coinName")}
                    className="cursor-pointer"
                  >
                    Asset{" "}
                    {sortField === "coinName"
                      ? sortOrder === "asc"
                        ? "↑"
                        : "↓"
                      : ""}
                  </p>
                </div>
              </TableCell>
              <TableCell
                sx={{ color: "white", cursor: "pointer" }}
                onClick={() => handleSort("currentPrice")}
              >
                Holdings{" "}
                {sortField === "currentPrice"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </TableCell>
              <TableCell
                sx={{ color: "white", cursor: "pointer" }}
                onClick={() => handleSort("totalValue")}
              >
                Total Current Value{" "}
                {sortField === "totalValue"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </TableCell>
              <TableCell
                sx={{ color: "white", cursor: "pointer" }}
                onClick={() => handleSort("stcg.gain")}
              >
                Short-Term{" "}
                {sortField === "stcg.gain"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </TableCell>
              <TableCell
                sx={{ color: "white", cursor: "pointer" }}
                onClick={() => handleSort("ltcg.gain")}
              >
                Long-Term{" "}
                {sortField === "ltcg.gain"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </TableCell>
              <TableCell sx={{ color: "white" }}>Amount to sell</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((item, index) => {
              const value = item.totalHolding * item.currentPrice;
              return (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center">
                      <Checkbox
                        sx={{ color: "#A9AFC5", marginRight: "20px" }}
                        checked={checked.includes(item.coin)}
                        onChange={(event) => checking(item.coin, event)}
                      />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <Avatar
                          src={item.logo}
                          alt={item.coin}
                          sx={{ width: 30, height: 30 }}
                        />
                        <div>
                          <Typography sx={{ fontSize: 14, color: "white" }}>
                            {item.coinName}
                          </Typography>
                          <Typography variant="caption" color="gray">
                            {item.coin}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Typography sx={{ fontSize: 14, color: "white" }}>
                        {`${formatCurrency(item.totalHolding)} ${item.coin}`}
                      </Typography>
                      <Typography variant="caption" color="gray">
                        {`${formatCurrency(item.currentPrice)}/${item.coin}`}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell sx={{ fontSize: 14, color: "white" }}>
                    {formatCurrency(value)}
                  </TableCell>
                  <TableCell
                    sx={{
                      color:
                        item.stcg.gain === 0
                          ? "white"
                          : item.stcg.gain < 0
                          ? "red"
                          : "lightgreen",
                    }}
                  >
                    {formatCurrency(item.stcg.gain)}
                  </TableCell>
                  <TableCell
                    sx={{
                      color:
                        item.ltcg.gain === 0
                          ? "white"
                          : item.ltcg.gain < 0
                          ? "red"
                          : "lightgreen",
                    }}
                  >
                    {formatCurrency(item.ltcg.gain)}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>---</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CryptoHoldingsTable;
