import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

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
            <p className="text-sm">Important Notes and Disclaimers .</p>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
