import { ResponsiveLine } from "@nivo/line";


const LineChart = ({ isDashboard = false, analytics = {} }) => {

  const analyticsColors = ["#68C3A3", "#FFB74D", "#FF6F61", "#6D4C41", "#42A5F5", "#AB47BC", "#FFA726", "#26A69A", "#EF5350", "#7E57C2"];

  const data = analytics.map((item, index) => {
    return {
      id: item?.find((item) => item.Key === 'id')?.Value,
      color: analyticsColors[index],
      data: item?.find(item => item.Key === 'data')?.Value.map((item) => {
        return {
          x: item?.find(item => item.Key === 'x')?.Value,
          y: item?.find(item => item.Key === 'y')?.Value
        }
      })
    }
  })

  console.log(data)

  return (
    <ResponsiveLine
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: "black",
            },
          },
          legend: {
            text: {
              fill: "black",
            },
          },
          ticks: {
            line: {
              stroke: "black",
              strokeWidth: 1,
            },
            text: {
              fill: "black",
            },
          },
        },
        legends: {
          text: {
            fill: "black",
          },
        },
        tooltip: {
          container: {
            color: "black",
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "transportation", // added
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "count", // added
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;