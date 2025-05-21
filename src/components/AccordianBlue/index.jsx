import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import CircleIcon from "@mui/icons-material/Circle";

export default function AccordionUsage() {
  return (
    <div>
      <Accordion
        sx={{
          backgroundColor: "#121D3A", // dark background
          border: "1px solid #6290FF", // custom border
          borderRadius: "8px",
          color: "#ffffff",
          boxShadow: "none",
          "&.Mui-expanded": {
            marginBottom: "30px",
          },
          marginBottom: "20px",
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon sx={{ color: "#C4C4C4", fontSize: "30px" }} />
          }
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ height: 30 }}
        >
          <div className="flex items-center">
            <InfoOutlinedIcon className=" text-[#6290FF]" />
            <p className="text-sm ml-5">Important Notes and Disclaimers .</p>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <ul className="ml-5">
            <div className="flex ">
              <CircleIcon sx={{ height: "10px", marginTop: "7px" }} />
              <li className="text-sm">
                Tax-loss harvesting is currently not allowed under Indian tax
                regulations. Please consult your tax advisor before making any
                decisions.
              </li>
              <br />
            </div>
            <div className="flex ">
              <CircleIcon sx={{ height: "10px", marginTop: "7px" }} />
              <li className="text-sm">
                Tax harvesting does not apply to derivatives or futures. These
                are handled separately as business income under tax rules.
              </li>
              <br />
            </div>
            <div className="flex ">
              <CircleIcon sx={{ height: "10px", marginTop: "7px" }} />
              <li className="text-sm">
                Price and market value data is fetched from Coingecko, not from
                individual exchanges. As a result, values may slightly differ
                from the ones on your exchange.
              </li>
              <br />
            </div>
            <div className="flex ">
              <CircleIcon sx={{ height: "10px", marginTop: "7px" }} />
              <li className="text-sm">
                Some countries do not have a short-term / long-term bifurcation.
                For now, we are calculating everything as long-term.
              </li>
              <br />
            </div>
            <div className="flex ">
              <CircleIcon sx={{ height: "10px", marginTop: "7px" }} />
              <li className="text-sm">
                Only realized losses are considered for harvesting. Unrealized
                losses in held assets are not counted.
              </li>
              <br />
            </div>
          </ul>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
