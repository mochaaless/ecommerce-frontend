import { Box } from "@mui/material";
import {colors} from "../static.js";

const ProgressCircle = ({ progress, size = "30" }) => {
  const angle = progress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(${"white"} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${"#d8d8d8"} ${angle}deg 360deg),
            ${colors.primary}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;