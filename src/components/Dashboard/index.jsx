import Navbar from "../Navbar";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import PreHarvesting from "../PreHarvesting";
import AfterHarvesting from "../AfterHarvesting";
import AccordionUsage from "../AccordianBlue";

import CreatedTable from "../CreatedTable";

const Dashboard = () => {
  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 100,
      color: "black",
      background: "white",
    },
  });

  return (
    <div className="bg-[#0A0A12] w-full ">
      <Navbar />
      <div className="px-8 py-2 ">
        <div className="flex items-center">
          <h1 className="font-semibold text-white m-0 text-[24px]">
            Tax Harvesting
          </h1>
          <CustomWidthTooltip
            title={
              "lwejknwbjklenlaebnglbwlbawqblllbogjwaeklgbedwsgvbnowedbngvowlblbjp"
            }
            arrow
          >
            <Button sx={{ m: 1 }}>How it Works ?</Button>
          </CustomWidthTooltip>
        </div>
        <AccordionUsage />
        <div className="block lg:flex justify-center mt-5">
          <PreHarvesting />
          <AfterHarvesting />
        </div>
        <CreatedTable />
      </div>
    </div>
  );
};
export default Dashboard;
