import logo from './logo.svg';
import './App.css';

import MainScreen from './Components/LandingPage/MainScreen';
import LoginPage from './Components/LandingPage/LoginPage';
import HodHomePage from './Components/HODPanel/HODHomePage'
import ApproveResult from './Components/HODPanel/ApproveResult';
import HODViewResult from './Components/HODPanel/ApproveResult/ViewResult';
import ManageChangeReq from './Components/HODPanel/ManageChangeReq';

import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>

        <Route path='/' element={<MainScreen/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/hodHomePage' element={<HodHomePage/>}/>
        <Route path='/hodapproveResult' element={<ApproveResult/>}/>
        <Route path='/hodViewResult' element={<HODViewResult/>}/>
        <Route path='/hodManageChangeReq' element={<ManageChangeReq/>}/>

      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
