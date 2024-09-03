import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
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
  ArcElement // Register ArcElement for Pie chart
);

const NewLineText = ({ text }) => {
  // Split the text into sentences based on period and space
  const sentences = text.split(". ");

  return (
    <div style={{color:'black'}}>
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

  const API_URL =
    "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"; // Change this to your preferred model
  const API_TOKEN = `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`; // Replace with your Hugging Face API token

  useEffect(() => {
    const fetchGPAData = async () => {
      try {
        const response = await fetch(`http://localhost:8081/result/Get/${ID}`);
        const data = await response.json();

        // Process data to count the number of students in each GPA category
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

        data.forEach((student) => {
          const gpa = student.GPA;
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

        // Generate summaries
        generateSummary(gpaCategories, "bar", data.length);
        generateSummary(
          { pass: passCount, fail: failCount },
          "pie",
          data.length
        );
      } catch (error) {
        console.error("Error fetching GPA data:", error);
      }
    };

    const generateSummary = async (data, chartType, totalStudents) => {
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
        console.log("Pie Chart Summary:", summary);
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
        display: true,
        position: "top",
        labels: {
          font: {
            size: 14,
            family: "Arial, sans-serif",
            style: "italic",
            weight: "bold",
          },
          color: "#333",
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

  return (
    <div id="mainDivGraph">
      <div id="GraphDivTop">
        <SideBar/>
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
            <NewLineText text={barSummary}  />
          </div>
          <div
            style={{
              width: "400px",
              height: "auto",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
              padding: "20px",
            }}
          >
            <h2>Pass/Fail Distribution</h2>
            <Pie data={pieData} options={pieOptions} />
            <p style={{color:'black'}}>{pieSummary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPAGraph;
