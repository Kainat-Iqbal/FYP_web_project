import React, { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import "./GPAGraphStyle.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";
import { useLocation } from "react-router-dom";
import SideBar from "../Sidebar";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // Register ArcElement for Pie chart
  LineElement,
  PointElement
);

const NewLineText = ({ text }) => {
  // Split the text into sentences based on period and space
  const sentences = text.split(". ");

  return (
    <div style={{ color: "black" }}>
      {sentences.map((sentence, index) => (
        <React.Fragment key={index}>
          {sentence}
          {/* Add a period back if it's not the last sentence */}
          {index < sentences.length - 1 && "."}
          <br />
        </React.Fragment>
      ))}
    </div>
  );
};

const GPAGraph = () => {
  const location = useLocation();
  const courseData = location.state?.course;

  const ID = courseData?.assignId;
  console.log("DCFCVF df", ID);

  const COURSE = courseData?.course_title;
  console.log("DFCD COUSe", COURSE);

  const [gpaData, setGpaData] = useState({});
  const [passFailData, setPassFailData] = useState({ pass: 0, fail: 0 });
  const [barSummary, setBarSummary] = useState("");
  const [pieSummary, setPieSummary] = useState("");
  const [normalDistributionDATA, setNormalDistributionData] = useState({});


  useEffect(() => {
    const fetchGPAData = async () => {
      try {
        const response = await fetch(`http://localhost:8081/result/Get/${ID}`);
        const data = await response.json();

        const gpaCategories = {
          Fail: 0,
          "2.00": 0,
          2.33: 0,
          2.66: 0,
          "3.00": 0,
          3.33: 0,
          3.66: 0,
          "4.00": 0,
        };

        let passCount = 0;
        let failCount = 0;
        const gpaValues = [];

        data.forEach((student) => {
          const gpa = student.GPA;
          gpaValues.push(gpa); // Collect GPA values for normal distribution
          if (gpa < 2.0) {
            gpaCategories["Fail"] += 1;
            failCount += 1;
          } else {
            passCount += 1;
            if (gpaCategories[gpa.toFixed(2)] !== undefined) {
              gpaCategories[gpa.toFixed(2)] += 1;
            }
          }
        });

        setGpaData(gpaCategories);
        setPassFailData({ pass: passCount, fail: failCount });

        // Calculate mean and standard deviation
        const mean = gpaValues.reduce((sum, value) => sum + value, 0) / gpaValues.length;
        const stddev = Math.sqrt(gpaValues.reduce((sum, value) => sum + (value - mean) ** 2, 0) / gpaValues.length);

        // Generate normal distribution data
        const normalData = Array.from({ length: 101 }, (_, i) => {
          const x = i / 100 * 4; // Adjust x values from 0 to 4
          return (
            (1 / (stddev * Math.sqrt(2 * Math.PI))) *
            Math.exp(-((x - mean) ** 2) / (2 * stddev ** 2))
          );
        });

        setNormalDistributionData({
          labels: Array.from({ length: 101 }, (_, i) => (i / 100 * 4).toFixed(2)), // x values from 0 to 4
          datasets: [
            {
              label: "Normal Distribution",
              data: normalData,
              fill: true,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
            },
          ],
        });

        // Generate summaries
        generateSummary(gpaCategories, "bar", data.length);
        generateSummary({ pass: passCount, fail: failCount }, "pie", data.length);
      } catch (error) {
        console.error("Error fetching GPA data:", error);
      }
    };

    const generateSummary = (data, chartType, totalStudents) => {
      let summary;
      if (chartType === "bar") {
        summary = `There is a total of ${totalStudents} students' data. From which `;
        for (const [gpa, count] of Object.entries(data)) {
          if (gpa === "Fail" && count === 0) {
            summary += `No student is fail. `;
          } else {
            summary += `${count} student(s) have a GPA of ${gpa}. `;
          }
        }
        setBarSummary(summary);
      } else if (chartType === "pie") {
        summary = `There is the data for ${totalStudents} students. Out of these, ${data.pass} passed and ${data.fail} failed.`;
        if (data.fail === 0) {
          summary += ` No student has failed.`;
        }
        setPieSummary(summary);
      }
    };

    fetchGPAData();
  }, [ID]);

  // Bar chart data
  const barData = {
    labels: Object.keys(gpaData),
    datasets: [
      {
        label: "Number of Students",
        data: Object.values(gpaData),
        backgroundColor: [
          "rgba(236, 112, 99, 0.6)", // Fail
          "rgba(58, 123, 213, 0.6)", // 2.00
          "rgba(0, 204, 255, 0.6)", // 2.33
          "rgba(255, 159, 64, 0.6)", // 2.66
          "rgba(75, 192, 192, 0.6)", // 3.00
          "rgba(153, 102, 255, 0.6)", // 3.33
          "rgba(255, 205, 86, 0.6)", // 3.66
          "rgba(54, 162, 235, 0.6)", // 4.00
        ],
        borderColor: [
          "rgba(236, 112, 99, 1)", // Fail
          "rgba(58, 123, 213, 1)", // 2.00
          "rgba(0, 204, 255, 1)", // 2.33
          "rgba(255, 159, 64, 1)", // 2.66
          "rgba(75, 192, 192, 1)", // 3.00
          "rgba(153, 102, 255, 1)", // 3.33
          "rgba(255, 205, 86, 1)", // 3.66
          "rgba(54, 162, 235, 1)", // 4.00
        ],
        borderWidth: 1,
      },
    ],
  };

  // Pie chart data
  const pieData = {
    labels: ["Pass", "Fail"],
    datasets: [
      {
        label: "Pass/Fail Distribution",
        data: [passFailData.pass, passFailData.fail],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Pass
          "rgba(236, 112, 99, 0.6)", // Fail
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)", // Pass
          "rgba(236, 112, 99, 1)", // Fail
        ],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
        labels: {
          font: {
            size: 14,
            family: "Arial, sans-serif",
            style: "italic",
            weight: "bold",
          },
          color: "yellow",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.7)",
        titleColor: "#fff",
        bodyColor: "#fff",
        cornerRadius: 4,
        titleFont: {
          family: "Arial, sans-serif",
          size: 16,
        },
        bodyFont: {
          family: "Arial, sans-serif",
          size: 14,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "GPA Categories",
          color: "#666",
          font: {
            family: "Arial, sans-serif",
            size: 16,
            weight: "bold",
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.3)",
        },
        title: {
          display: true,
          text: "Number of Students",
          color: "#666",
          font: {
            family: "Arial, sans-serif",
            size: 16,
            weight: "bold",
          },
        },
        ticks: {
          stepSize: 1, // Set the step size on the y-axis to 1
        },
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutBounce",
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.7)",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    layout: {
      padding: {
        left: 20,
      },
    },
  };

  // Normal distribution data
  const normalDistributionData = {
    labels: Array.from({ length: 101 }, (_, i) => i / 100), // x values from 0 to 1
    datasets: [
      {
        label: "Normal Distribution",
        data: Array.from({ length: 101 }, (_, i) => {
          const x = i / 100;
          const mean = 0.5; // Adjust mean as needed
          const stddev = 0.1; // Adjust standard deviation as needed
          return (
            (1 / (stddev * Math.sqrt(2 * Math.PI))) *
            Math.exp(-((x - mean) ** 2) / (2 * stddev ** 2))
          );
        }),
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  const normalDistributionOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "GPA",
        },
      },
      y: {
        title: {
          display: true,
          text: "Probability Density",
        },
      },
    },
  };

  return (
    <div id="mainDivGraph">
      <div id="GraphDivTop">
        <SideBar />
      </div>
      <div id="GraphDivBottom">
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          Insights of {COURSE}
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "start",
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "600px",
              height: "auto",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
              padding: "20px",
            }}
          >
            <h2>GPA Distribution</h2>
            <Bar data={barData} options={barOptions} />
            {/* <p>{barSummary}</p> Display the bar chart summary */}
            <NewLineText text={barSummary} />
          </div>
          <div
            style={{
              width: "400px",
              height: "93vh",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
              padding: "20px",
            }}
          >
            <h2>Pass/Fail Distribution</h2>
            <Pie
              data={pieData}
              options={pieOptions}
              style={{ marginBottom: "5vh" }}
            />
            <p style={{ color: "black" }}>{pieSummary}</p>
          </div>
        </div>
      </div>
      {/* <div
        className="normal-distribution-container"
        style={{
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
          padding: "20px",
          height: "80vh",
          marginTop: "20vh",
          marginLeft: "20vw",
          width:'77vw'
        }}
      >
        <h2>Normal Distribution of GPA</h2>
        {normalDistributionDATA.labels && normalDistributionDATA.datasets && (
            <Line data={normalDistributionDATA} options={{ responsive: true }} style={{width:'80%'}}
/>
          )}

      </div> */}
    </div>
  );
};

export default GPAGraph;
