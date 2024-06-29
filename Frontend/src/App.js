import logo from './logo.svg';
import './App.css';

import MainScreen from './Components/LandingPage/MainScreen';
import LoginPage from './Components/LandingPage/LoginPage';
import HODHomePage from './Components/HODPanel/HODHomePage';
import HODResultApproval from './Components/HODPanel/HODResultApproval';
import HODViewResult from './Components/HODPanel/HODResultApproval/HODViewResult';
import HODResultFeedback from './Components/HODPanel/HODResultApproval/HODResultFeedback';
import AssignCourse from './Components/HODPanel/AssignCourse';
import HODManageChangeReq from './Components/HODPanel/HODManageChangeReq';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>

        <Route path='/' element={<MainScreen/>}/>
        <Route path='/Login' element={<LoginPage/>}/>
        <Route path='/HODHomePage' element={<HODHomePage/>}/>
        <Route path='/HODResultApproval' element={<HODResultApproval/>}/>
        <Route path='/HODViewResult' element={<HODViewResult/>}/>
        <Route path='/HODResultFeedback' element={<HODResultFeedback/>}/>
        <Route path='/HODManageChangeReq' element={<HODManageChangeReq/>}/>
        <Route path='/AssignCourse' element={<AssignCourse/>}/>

        

      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
