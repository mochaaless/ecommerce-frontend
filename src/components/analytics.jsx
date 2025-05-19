import React, { useEffect } from "react";
import StatBox from "./statbox.jsx";
import { colors } from "../static.js";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import Chart from "./chart.jsx";
import axios from "axios";

function Analytics() {
  const [timeData, setTimeData] = React.useState("alltime");
  const [analytics, setAnalytics] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchAnalytics = (timeValue) => {
    setIsLoading(true);

    // Crear un array de promesas con tus peticiones
    const requests = [
      axios.get(
        `https://lacosterabackend.mochalesdev.com/analytics?time=${timeValue}`
      ),
    ];

    Promise.all(requests)
      .then((responses) => {
        setAnalytics(responses[0].data.data);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAnalytics(timeData);
  }, [timeData]);

  const handleTimeDataChange = (newTimeData) => {
    setTimeData(newTimeData);
    fetchAnalytics(newTimeData);
  };

  if (isLoading) {
    return (
      <div className="loading-progress">
        <CircularProgress color="red" />
      </div>
    );
  }

  if (!analytics) {
    return (
      <Typography
        style={{ whiteSpace: "normal", wordWrap: "break-word" }}
        variant="h5"
        color="error"
      >
        Failed to load data. Please try again later.
      </Typography>
    );
  }



  return (
    <div className="analytics">
      <div className="timeData-buttons">
        <button
          onClick={() => handleTimeDataChange("day")}
          className={
            timeData === "day" ? "timeData-button-selected" : "timeData-button"
          }
        >
          TODAY
        </button>
        <button
          onClick={() => handleTimeDataChange("month")}
          className={
            timeData === "month"
              ? "timeData-button-selected"
              : "timeData-button"
          }
        >
          MONTH
        </button>
        <button
          onClick={() => handleTimeDataChange("year")}
          className={
            timeData === "year" ? "timeData-button-selected" : "timeData-button"
          }
        >
          YEAR
        </button>
        <button
          onClick={() => handleTimeDataChange("lastyear")}
          className={
            timeData === "lastyear"
              ? "timeData-button-selected"
              : "timeData-button"
          }
        >
          LAST YEAR
        </button>
        <button
          onClick={() => handleTimeDataChange("alltime")}
          className={
            timeData === "alltime"
              ? "timeData-button-selected"
              : "timeData-button"
          }
        >
          ALL TIME
        </button>
      </div>

      <div className="statboxes">
        <StatBox
          title={analytics.remainingListings}
          subtitle="Inventory Remaining"
          increase="24"
          isDashBoardAnalytic={true}
          icon={
            <StorefrontIcon
              sx={{ color: colors.primary, fontSize: "25px" }}
            />
          }
        />
        <StatBox
          title={analytics.salesNumber}
          subtitle="Sales Obtained"
          increase="67"
          isDashBoardAnalytic={true}
          icon={
            <ShoppingCartIcon
              sx={{ color: colors.primary, fontSize: "25px" }}
            />
          }
        />
        <StatBox
          title={analytics.income + " €"}
          subtitle="Income Obtained"
          increase="77"
          isDashBoardAnalytic={true}
          icon={
            <PaymentsIcon sx={{ color: colors.primary, fontSize: "25px" }} />
          }
        />
      </div>
      <div className="triple-sections">
        <div className="section-large">
          <div className="section-title">Analytics</div>
          <div className="section-content">
            <Chart chartAnalytics={analytics.salesByPeriod} />
          </div>
        </div>
        <div className="section">
          <div className="section-title">Last Sales</div>
          <div className="section-content-container">
            {analytics.lastSales.map((element, index) => {
              return (
                <div className="section-content" key={index}>
                  <div className="first-section">
                    <div className="site">{element.Site}</div>
                    <div className="date">{(new Date(element.Date * 1000)).toLocaleString()}</div>
                    <div className="description">
                      Status: {element.Status}
                    </div>
                  </div>
                  <div className="second-section">{element.TotalQty} items</div>
                  <div className="third-section">
                    <div className="price">{element.TotalPrice.toFixed(2)} €</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
