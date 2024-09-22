import { useEffect } from 'react';
import './App.css';
import AddHOD from './Components/AdminPanel/Add/AddHOD';
import AddTeacher from './Components/AdminPanel/Add/AddTeacher';
import Home from './Components/AdminPanel/Home';
import SideBar from './Components/AdminPanel/SideBar';
import ViewTeacher from './Components/AdminPanel/View/ViewTeacher';
import LoginPage from './Components/LandingPage/LoginPage';
import MainScreen from './Components/LandingPage/MainScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Auth from './Components/Auth';
import UpdateTeacher from './Components/AdminPanel/Update/UpdateTeacher';
import Dashboard from './Components/TeacherPanel/Dashboard';
import Courses from './Components/TeacherPanel/Courses';
import CreateResult from './Components/TeacherPanel/CreateResult';
import ViewResult from './Components/TeacherPanel/ViewResult';
//import HodHomePage from './Components/HODPanel/HODHomePage';
//import ApproveResult from './Components/HODPanel/ApproveResult';
//import ManageChangeReq from './Components/HODPanel/ManageChangeReq';
//import HODViewResult from './Components/HODPanel/ApproveResult/ViewResult';
import AddDean from './Components/AdminPanel/Add/AddDean';
import ViewDeanHodExam from './Components/AdminPanel/View/ViewDeanHodExam';
import UpdateDean from './Components/AdminPanel/Update/UpdateDean';
import AddExamination from './Components/AdminPanel/Add/AddExamination';
import UpdateExamination from './Components/AdminPanel/Update/UpdateExamination';
import AddCourse from './Components/AdminPanel/Add/AddCourse';
import AddDegreeProgram from './Components/AdminPanel/Add/AddDegreeProgram';
import UpdateHod from './Components/AdminPanel/Update/UpdateHod';
import ViewCourse from './Components/AdminPanel/View/ViewCourse';
import UpdateCourse from './Components/AdminPanel/Update/UpdateCourse';
import ViewDegree from './Components/AdminPanel/View/ViewDegreeSessionBatch';
import UpdateDegree from './Components/AdminPanel/Update/UpdateDegree';
import AddBatch from './Components/AdminPanel/Add/AddBatch';
import UpdateBatch from './Components/AdminPanel/Update/UpdateBatch';
import AddSession from './Components/AdminPanel/Add/AddSession';
import UpdateSession from './Components/AdminPanel/Update/UpdateSession';
import AddStudent from './Components/AdminPanel/Add/AddStudent';
import ViewStudent from './Components/AdminPanel/View/ViewStudent';
import StudentTable from './Components/Utilities/StudentTable';
//HOD Pages
import HODHomePage from './Components/HODPanel/HODHomePage';
import AssignCourse from './Components/HODPanel/AssignCourse';
import HODResultApproval from './Components/HODPanel/HODResultApproval';
import HODViewResult from './Components/HODPanel/HODResultApproval/HODViewResult';
import HODResultFeedback from './Components/HODPanel/HODResultApproval/HODResultFeedback';
import HODManageChangeReq from './Components/HODPanel/HODManageChangeReq';

//Dean Pages
import DeanHomePage from './Components/DeanPanel/DeanHomePage';
import DeanResultApproval from './Components/DeanPanel/DeanResultApproval';
import DeanViewResult from './Components/DeanPanel/DeanResultApproval/DeanViewResult';
import DeanManageChangeReq from './Components/DeanPanel/DeanManageChangeReq';

//Controller Of Examination Pages
import ControllerOfExaminationHomePage from './Components/ControllerOfExaminationPanel/ControllerOfExaminationHomePage';
import ControllerOfExaminationResultApproval from './Components/ControllerOfExaminationPanel/ControllerOfExaminationResultApproval';
import ControllerOfExaminationViewResult from './Components/ControllerOfExaminationPanel/ControllerOfExaminationResultApproval/ControllerOfExaminationViewResult';
import ControllerOfExaminationManageChangeReq from './Components/ControllerOfExaminationPanel/ControllerOfExaminationManageChangeReq';

//Student Pages
import StudentHomePage from './Components/StudentPanel/StudentHomePage';
import StudentViewCourse from './Components/StudentPanel/StudentViewCourse';
import StudentViewResult from './Components/StudentPanel/StudentViewResult';
import StudentViewProforma from './Components/StudentPanel/StudentViewProforma';
import GPAGraph from './Components/TeacherPanel/GPAGraph';
import Insights from './Components/TeacherPanel/Insights';

//LandingPage
import React from 'react'
import { Helmet } from "react-helmet";
import Landing from "././screens/Landing.jsx";
import StudentCard from './Components/StudentPanel/StudentCard/index.js';
import StudentDetailInsights from './Components/StudentPanel/StudentDetailInsights/index.js';


function App() {

  return (
    <>
    <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
      </Helmet>
      <BrowserRouter>
      <Routes>

        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/home' element={<Auth>
          <Home/>
        </Auth>}/>
        <Route path='/addTeacher' element={<Auth>
          <AddTeacher/>
        </Auth>}/>
        <Route path='/addHOD' element={<AddHOD/>}/>
        <Route path='/addDean' element={<AddDean/>}/>
        <Route path='/addCourse' element={<AddCourse/>}/>
        <Route path='/addExamination' element={<AddExamination/>}></Route>
        <Route path='/addDegreeProgram' element={<AddDegreeProgram/>}></Route>
        <Route path='/addBatch' element={<AddBatch/>}></Route>
        <Route path='/addSession' element={<AddSession/>}></Route>
        <Route path='/addStudent' element={<AddStudent/>}></Route>
        <Route path='/viewTeacher' element={<Auth>
          <ViewTeacher/>
        </Auth>}/>
        <Route path='/viewCourse' element={<ViewCourse/>}></Route>
        <Route path='/viewDean' element={<ViewDeanHodExam/>}></Route>
        <Route path='/viewDegree' element={<ViewDegree/>}></Route>
        <Route path='/viewStudent' element={<ViewStudent/>}></Route>
        <Route path='/addStudent' element={<AddStudent/>}></Route>
        <Route path='/updateTeacher/:id' element={<UpdateTeacher/>}></Route>
        <Route path='/updateHod/:id' element={<UpdateHod/>}></Route>
        <Route path='/updateDean/:id' element={<UpdateDean/>}></Route>
        <Route path='/updateExamination/:id' element={<UpdateExamination/>}></Route>
        <Route path='/updateCourse/:id' element={<UpdateCourse/>}></Route>
        <Route path='/updateDegree/:id' element={<UpdateDegree/>}></Route>
        <Route path='/updateBatch/:id' element={<UpdateBatch/>}></Route>
        <Route path='/updateSession/:id' element={<UpdateSession/>}></Route>
        <Route path='/teacherHome' element={<Dashboard/>}></Route>
        <Route path='/teacherCourses' element={<Courses/>}></Route>
        <Route path='/createResult' element={<CreateResult/>}></Route>
        <Route path='/viewResult' element={<ViewResult/>}></Route>
        
        {/* Teacher */}
        <Route path='/courses' element={<Courses />} />
        <Route path='/teacher' element={<Dashboard />} />
        <Route path='/student' element={<StudentTable />} />
        <Route path='/createResult' element={<CreateResult />} />
        <Route path='/HODHomePage' element={<HODHomePage />} />
        <Route path='/insightCourse' element={<Insights/>}/>
        <Route path='/GPAGraph' element={<GPAGraph/>}/>

          <Route path='/AssignCourse' element={<AssignCourse />} />
          <Route path='/HODResultApproval' element={<HODResultApproval />} />
          <Route path='/HODViewResult' element={<HODViewResult />} />
          <Route path='/HODResultFeedback' element={<HODResultFeedback />} />
          <Route path='/HODManageChangeReq' element={<HODManageChangeReq />} />

          <Route path='/DeanHomePage' element={<DeanHomePage/>}/>
          <Route path='/DeanResultApproval' element={<DeanResultApproval />} />
          <Route path='/DeanViewResult' element={<DeanViewResult />} />
          <Route path='/DeanManageChangeReq' element={<DeanManageChangeReq />} />
          
          <Route path='/ControllerOfExaminationHomePage' element={<ControllerOfExaminationHomePage/>} />
          <Route path='/ControllerOfExaminationResultApproval' element={<ControllerOfExaminationResultApproval/>} />
          <Route path='/ControllerOfExaminationViewResult' element={<ControllerOfExaminationViewResult/>} />
          <Route path='/ControllerOfExaminationManageChangeReq' element={<ControllerOfExaminationManageChangeReq/>} />

          <Route path='/StudentHomePage' element={<StudentHomePage/>}/>
          <Route path='/StudentViewCourse' element={<StudentViewCourse/>} />
          <Route path='/StudentViewResult' element={<StudentViewResult/>} />
          <Route path='/StudentViewProforma' element={<StudentViewProforma/>} />
          <Route path='/StudentCard' element={<StudentCard/>}/>
          <Route path="/StudentDetailInsights/:studentId" element={<StudentDetailInsights/>} />

       
      </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
