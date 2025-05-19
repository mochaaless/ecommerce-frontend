import { Box, Typography } from "@mui/material";
import ProgressCircle from "./progressCircle.jsx";

const StatBox = ({ title, subtitle, icon, increase }) => {

  const progess = +increase/100

  return (
    <div className="statbox">
      <Box width="100%">
        <Box display="flex" justifyContent="space-between">
          <Box>
            {icon}
            <Typography variant="h4" fontWeight="bold" sx={{ color: "black", paddingTop: "5px", fontSize:"15px"}}>
              {title}
            </Typography>
          </Box>
          <Box>
            <ProgressCircle progress={progess} />
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          mt="1px"
          sx={{ paddingTop: "5px" }}
        >
          <Typography variant="h5" sx={{ color: "black", fontSize:"12px"}}>
            {subtitle}
          </Typography>
          <Typography
            variant="h5"
            fontStyle="italic"
            sx={{ color: "black", fontSize:"14px" }}
          >
            {increase}%
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default StatBox;
