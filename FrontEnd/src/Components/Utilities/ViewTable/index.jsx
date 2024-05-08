import React, { useState } from 'react';


const ViewTable = () => {
  // State for dynamic marks
  const [students, setStudents] = useState([
    {
      id: 1,
      seatNo: '7829122',
      enrollmentNo: '2021/Comp/BSSE/25637',
      name: 'John Doe',
      fatherName: 'Michael Doe',
      midMarks: '18',
      terminalMarks: '42',
      labMarks: '26',
      totalMarks:'86',
      GP:'4.00',
    },
    {
      id: 2,
      seatNo: '7829122',
      enrollmentNo: '2021/Comp/BSSE/25637',
      name: 'John Doe',
      fatherName: 'Michael Doe',
      midMarks: '18',
      terminalMarks: '42',
      labMarks: '26',
      totalMarks:'86',
      GP:'4.00',
    },
    {
      id: 3,
      seatNo: '7829122',
      enrollmentNo: '2021/Comp/BSSE/25637',
      name: 'John Doe',
      fatherName: 'Michael Doe',
      midMarks: '18',
      terminalMarks: '42',
      labMarks: '26',
      totalMarks:'86',
      GP:'4.00',
    },
    {
      id: 4,
      seatNo: '7829122',
      enrollmentNo: '2021/Comp/BSSE/25637',
      name: 'John Doe',
      fatherName: 'Michael Doe',
      midMarks: '18',
      terminalMarks: '42',
      labMarks: '26',
      totalMarks:'86',
      GP:'4.00',
    },
    {
      id: 5,
      seatNo: '7829122',
      enrollmentNo: '2021/Comp/BSSE/25637',
      name: 'John Doe',
      fatherName: 'Michael Doe',
      midMarks: '18',
      terminalMarks: '42',
      labMarks: '26',
      totalMarks:'86',
      GP:'4.00',
    },
    {
      id: 6,
      seatNo: '7829122',
      enrollmentNo: '2021/Comp/BSSE/25637',
      name: 'John Doe',
      fatherName: 'Michael Doe',
      midMarks: '18',
      terminalMarks: '42',
      labMarks: '26',
      totalMarks:'86',
      GP:'4.00',
    },
    {
      id: 7,
      seatNo: '7829122',
      enrollmentNo: '2021/Comp/BSSE/25637',
      name: 'John Doe',
      fatherName: 'Michael Doe',
      midMarks: '18',
      terminalMarks: '42',
      labMarks: '26',
      totalMarks:'86',
      GP:'4.00',
    },
    {
      id: 8,
      seatNo: '7829122',
      enrollmentNo: '2021/Comp/BSSE/25637',
      name: 'John Doe',
      fatherName: 'Michael Doe',
      midMarks: '18',
      terminalMarks: '42',
      labMarks: '26',
      totalMarks:'86',
      GP:'4.00',
    },
    {
      id: 9,
      seatNo: '7829122',
      enrollmentNo: '2021/Comp/BSSE/25637',
      name: 'John Doe',
      fatherName: 'Michael Doe',
      midMarks: '18',
      terminalMarks: '42',
      labMarks: '26',
      totalMarks:'86',
      GP:'4.00',
    }
  ]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>S#</th>
            <th>Seat No.</th>
            <th>Enrollment No.</th>
            <th className='name'>Student's Name</th>
            <th className='name'>Father's Name</th>
            <th className="marks">Mid (20)</th>
            <th className="marks">Lab (30)</th>
            <th className="marks">Assign + Term (50/80)</th>
            <th className="marks">Grand Total</th>
            <th className="marks">GP</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr /* key={student.id} */>
              <td>{student.id}</td>
              <td>{student.seatNo}</td>
              <td>{student.enrollmentNo}</td>
              <td>{student.name}</td>
              <td>{student.fatherName}</td>
              <td>{student.midMarks} </td>
              <td>{student.labMarks} </td>
              <td>{student.terminalMarks}</td>
              <td>{student.totalMarks} </td>
              <td>{student.GP}</td>
           </tr>
          ))}
        </tbody>
      </table>
     {/*  <div className="buttonContainer">
        <button onClick={handleLockResult}>Lock Results</button>
        <button onClick={handleEnableEditing}>Enable Editing</button>
      </div> */}
    </div>
  );
};

export default ViewTable;
