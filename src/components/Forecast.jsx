import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import dayjs from "dayjs";

const Forecast = ({ title, forecast }) => {
  const groupedItems = forecast.reduce((acc, item) => {
    const [day, time] = item.title.split(", ");
    if (!acc[day]) acc[day] = [];
    acc[day].push({ time, temp: item.temp, icon: item.icon });
    return acc;
  }, {});

  return (
    <Box mt={4}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "#fff", fontWeight: "bold", mb: 2 }}
      >
        {title}
      </Typography>
      {Object.entries(groupedItems).map(([day, dayItems]) => {
        const labels = dayItems.map((item) => item.time);
        const temperatures = dayItems.map((item) => item.temp);

        const data = {
          labels,
          datasets: [
            {
              label: "Temperature (°C)",
              data: temperatures,
              borderColor: "#ffcc00",
              backgroundColor: "rgba(255, 204, 0, 0.3)",
              fill: true,
              tension: 0.4,
            },
          ],
        };

        return (
          <Card
            key={day}
            sx={{
              mb: 4,
              background: "linear-gradient(135deg, #1a237e, #3f51b5)",
              color: "#fff",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                py: 2,
                textAlign: "center",
                bgcolor: "#283593",
                color: "#ffeb3b",
                fontWeight: "bold",
              }}
            >
              {day}
            </Typography>
            <CardContent sx={{ py: 4 }}>
              <Box mb={4}>
                <Line
                  data={data}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </Box>
              <Box
                display="grid"
                gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))"
                gap={2}
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 2 }}
              >
                {dayItems.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      textAlign: "center",
                      p: 1,
                      bgcolor: "#1e88e5",
                      borderRadius: "8px",
                      boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
                      color: "#fff",
                    }}
                  >
                    <img
                      src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                      alt="weather icon"
                      style={{
                        width: "50px",
                        height: "50px",
                        marginBottom: "8px",
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ color: "#ffeb3b", fontWeight: "bold" }}
                    >
                      {item.temp}°C
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#bbdefb" }}>
                      {item.time}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default Forecast;
