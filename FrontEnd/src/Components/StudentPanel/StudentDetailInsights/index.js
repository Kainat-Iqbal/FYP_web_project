import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import './StudentDetailInsights.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useParams } from 'react-router-dom';
import SideBar from '../../TeacherPanel/Sidebar';

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StudentDetailInsights = () => {
  const { studentId } = useParams();
  const [studentResults, setStudentResults] = useState(null);
  const [cgpaData, setCgpaData] = useState(null);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8081/student/ViewIndividualStudentDetail/${studentId}`);
        const data = await response.json();
        setStudentResults(data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    const fetchCgpaDistribution = async () => {
      try {
        const response = await fetch(`http://localhost:8081/student/ViewStudentDetailWRTSesmester/${studentId}`);
        const data = await response.json();
        setCgpaData(data);
      } catch (error) {
        console.error('Error fetching CGPA distribution:', error);
      }
    };

    fetchStudentDetails();
    fetchCgpaDistribution();
  }, [studentId]);


  const cleanSummaryText = (text) => {
    // Remove unwanted characters and format the text
    return text
      .replace(/\\n/g, '<br/>') // Replace newline characters with line breaks
      .replace(/(\*\*.*?\*\*)/g, '<br/><strong>$1</strong>') // Convert **text** to <strong>text</strong> and add a line break before
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Ensure bold formatting is applied
      .replace(/\*(.*?)\*/g, '<em>$1</em>'); // Convert *text* to <em>text</em>
  };
  
  useEffect(() => {
    const fetchGeminiSummary = async () => {
      // Prepare data to be sent for the summary
      const gpaData = studentResults.map(result => `${result.course_title}: ${result.GPA}`);
      const cgpaDataSummary = cgpaData.map((result, index) => `Semester ${index + 1}: CGPA ${result.CGPA}`);
  
      // Construct the text for the API
      const summaryRequestText = `
        Here is the GPA distribution by course: ${gpaData.join(', ')}.
        Also, here is the CGPA distribution by semester: ${cgpaDataSummary.join(', ')}.
        Can you provide a brief summary of the student's academic performance?
      `;
  
      try {
        const response = await axios({
          url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBGPG-OF1jRxO4ICRjQpU7MVGpTSt_D030",
          method: "post",
          data: {
            contents: [
              { "parts": [{ "text": summaryRequestText }] }
            ]
          }
        });
        // Clean and format the summary text
        const rawSummary = response['data']['candidates'][0]['content']['parts'][0]['text'];
        const cleanedSummary = cleanSummaryText(rawSummary);
        setSummary(cleanedSummary);
      } catch (error) {
        console.error('Error fetching summary from Gemini API:', error);
      }
    };
  
    if (studentResults && cgpaData) {
      fetchGeminiSummary();
    }
  }, [studentResults, cgpaData]);
    
  
  if (!studentResults || !cgpaData) {
    return <p>Loading student details...</p>;
  }

  // Function to generate semester labels
  const generateSemesterLabels = (data) => {
    const semesterMap = {};
    let semesterCount = 1;

    return data.map(({ academic_year, semester }) => {
      const semesterKey = `${academic_year}-${semester}`;

      if (!semesterMap[semesterKey]) {
        semesterMap[semesterKey] = `Semester ${semesterCount++}`;
      }

      return semesterMap[semesterKey];
    });
  };

  // Data for GPA bar chart
  const chartData = {
    labels: studentResults.map(result => result.course_title),
    datasets: [
      {
        label: 'GPA Distribution',
        data: studentResults.map(result => result.GPA),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(201, 203, 207, 0.6)",
          "rgba(255, 99, 132, 0.6)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(201, 203, 207, 1)",
          "rgba(255, 99, 132, 1)"
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for GPA bar chart
  const barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'GPA',
          font: { size: 24 },
        },
        ticks: {
          callback: function(value) {
            return value.toFixed(2);
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'Courses',
          font: { size: 24 },
        },
      },
    },
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'GPA per Course',
      },
    },
  };

  // Generate semester labels
  const semesterLabels = generateSemesterLabels(cgpaData);

  // Data for CGPA line chart
  const cgpaChartData = {
    labels: semesterLabels,
    datasets: [
      {
        label: 'CGPA Distribution',
        data: cgpaData.map(result => result.CGPA),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  // Options for CGPA line chart
  const cgpaLineOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'CGPA',
          font: { size: 24 },
        },
        ticks: {
          callback: function(value) {
            return value.toFixed(2);
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'Semester',
          font: { size: 24 },
        },
      },
    },
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'CGPA Distribution by Semester',
      },
    },
  };

  return (
    <div id="StudentDetailsMainDiv">
      <div id="StudentDetailSideBar">
        <SideBar />
      </div>
      <div className="student-detail-insights-container">
        <h2>Results of {studentResults[0]?.name}</h2>
        <p className="student-batch-info">
          <strong>Batch:</strong> {studentResults[0]?.year + ' (' + studentResults[0]?.session + ')'}
        </p>
        
        {/* GPA Bar Chart */}
        <h3>GPA Distribution by Course</h3>
        <div className="student-chart-container">
          <Bar data={chartData} options={barOptions} height={500} width={1080} />
        </div>
        
        {/* CGPA Line Chart */}
        <h3>CGPA Distribution by Semester</h3>
        <div className="student-chart-container">
          <Line data={cgpaChartData} options={cgpaLineOptions} height={500} width={1080} />
        </div>

{summary && (
  <div className="summary-section">
    <h3>Summary</h3>
    <p style={{ color: 'black' }} dangerouslySetInnerHTML={{ __html: summary }} />
  </div>
)}
      </div>
    </div>
  );
};

export default StudentDetailInsights;
