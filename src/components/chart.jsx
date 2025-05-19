import { BarChart } from "@mui/x-charts/BarChart";

export default function Chart({ chartAnalytics }) {
  
  const colors = [
    "#000000",
    "#CC0000",
    "#e35e5e",
    "#f08787",
    "#b8b8b8",
    "#df3bb2",
    "#ff0000",
  ];

  const xAxis = [];
  const seriesData = [];

  const firstIndex = chartAnalytics[0].find((site) => site.Key === "id").Value === "All"
  if (chartAnalytics && chartAnalytics.length > 0 && !firstIndex) {
    chartAnalytics[0]
      .find((site) => site.Key === "data")
      .Value.forEach((elem) => {
        xAxis.push(elem.find((site) => site.Key === "x").Value);
      });
  
    chartAnalytics.forEach((site, index) => {
      const siteName = site.find((site) => site.Key === "id").Value
      const data = site
        .find((site) => site.Key === "data")
        .Value.map((elem) => elem.find((site) => site.Key === "y").Value);
      seriesData.push({
         data, 
         color: colors[index],
         label: siteName
      });
    });
  }

  return (
    <BarChart
      series={seriesData}
      height={310}
      xAxis={[{ data: xAxis, scaleType: "band" }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      slotProps={{
        legend: {
          hidden: true, // Esto oculta la leyenda
        },
      }}
      sx ={{ fontSize: "10px" }}
    />
  );
}
