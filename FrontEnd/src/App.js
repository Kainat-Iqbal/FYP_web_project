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
import HodHomePage from './Components/HODPanel/HODHomePage';
import ApproveResult from './Components/HODPanel/ApproveResult';

import ManageChangeReq from './Components/HODPanel/ManageChangeReq';
import HODViewResult from './Components/HODPanel/ApproveResult/ViewResult';
import AddStudent from './Components/AdminPanel/Add/AddStudent';
import AddDean from './Components/AdminPanel/Add/AddDean';
import ViewDeanHodExam from './Components/AdminPanel/View/ViewDeanHodExam';
import UpdateDean from './Components/AdminPanel/Update/UpdateDean';
import AddExamination from './Components/AdminPanel/Add/AddExamination';
import UpdateExamination from './Components/AdminPanel/Update/UpdateExamination';
import AddCourse from './Components/AdminPanel/Add/AddCourse';
import AddDegreeProgram from './Components/AdminPanel/Add/AddDegreeProgram';


function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>

        <Route path='/' element={<MainScreen/>}/>
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
        <Route path='/viewTeacher' element={<Auth>
          <ViewTeacher/>
        </Auth>}/>
        <Route path='/viewDean' element={<ViewDeanHodExam/>}></Route>
        <Route path='/addStudent' element={<AddStudent/>}></Route>
        <Route path='/updateTeacher/:id' element={<UpdateTeacher/>}></Route>
        <Route path='/updateDean/:id' element={<UpdateDean/>}></Route>
        <Route path='/updateExamination/:id' element={<UpdateExamination/>}></Route>
        <Route path='/teacherHome' element={<Dashboard/>}></Route>
        <Route path='/teacherCourses' element={<Courses/>}></Route>
        <Route path='/createResult' element={<CreateResult/>}></Route>
        <Route path='/viewResult' element={<ViewResult/>}></Route>
        <Route path='/hodHome' element={<HodHomePage/>}/>
        <Route path='/hodApproveResult' element={<ApproveResult/>}/>
        <Route path='/hodViewResult' element={<HODViewResult/>}/>
        <Route path='/hodManageChangeReq' element={<ManageChangeReq/>}/>

      </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
