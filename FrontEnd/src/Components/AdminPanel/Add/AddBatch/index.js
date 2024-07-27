import * as React from "react";
import "./addBatch.css";
import SideBar from "../../SideBar";
import axios from "axios";
import { useState, useEffect } from "react";

function AddBatch() {
  const [admin, setAdminId] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/session", {
          withCredentials: true,
        });
        setAdminId(response.data.userId);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  console.log("FVFV ", admin);
  // State variables to hold the input values
  const [values, setValues] = useState({
    adminId: "",
    year: new Date().getFullYear(),
    session: "Spring",
  });
  useEffect(() => {
    // Update values after admin is set
    if (admin !== null) {
      setValues((prev) => ({
        ...prev,
        adminId: admin,
      }));
    }
  }, [admin]);

  // Function to handle changes in input field
  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.post("http://localhost:8081/batch/Add", values).then((res) => {
      console.log("val", values);
      if (res.data === "success") {
        alert("Batch is added successfully");
        window.location.reload(); // Refresh the page
      } else {
        console.log("error");
      }
    });
  };

  // Generate an array of years from the current year to 20 years ago
  const [years, setYears] = useState([]);
  useEffect(() => {
    // Generate an array of years from the current year to 50 years ago
    const currentYear = new Date().getFullYear();
    const yearArray = [];
    for (let i = 0; i <= 50; i++) {
      yearArray.push(currentYear - i);
    }
    setYears(yearArray);
  }, []);


  return (
    <div id="mainAddBatchDiv">
      <SideBar />
      <div id="batchWithoutBar">
        <div id="batchTop">
          <h1>Add Batch</h1>
        </div>

        <div id="batchBottom">
          <form id="batchForm" action="" onSubmit={handleSubmit}>
            <div id="batchField">
              <label>Year</label>
              <select
                name="type"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="" disabled>Select year</option>
                    {years.map((year) => (
                <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div id="batchField">
              <label>Session</label>
              <select
                name="session"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="Spring">Spring</option>
                <option value="Fall">Fall</option>
              </select>
            </div>

            <button>Add Batch</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddBatch;
