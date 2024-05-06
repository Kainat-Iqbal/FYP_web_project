import { useEffect } from 'react';
import './App.css';
import AddHOD from './Components/AdminPanel/Add/AddHOD';
import AddTeacher from './Components/AdminPanel/Add/AddTeacher';
import Home from './Components/AdminPanel/Home';
import SideBar from './Components/AdminPanel/SideBar';
import ViewHOD from './Components/AdminPanel/View/ViewHOD';
import ViewTeacher from './Components/AdminPanel/View/ViewTeacher';
import LoginPage from './Components/LandingPage/LoginPage';
import MainScreen from './Components/LandingPage/MainScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Auth from './Components/Auth';
import UpdateTeacher from './Components/AdminPanel/Update/UpdateTeacher';


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
        <Route path='/viewTeacher' element={<Auth>
          <ViewTeacher/>
        </Auth>}/>
        <Route path='/viewHOD' element={<Auth>
          <ViewHOD/>
        </Auth>}/>
        <Route path='/updateTeacher/:id' element={<UpdateTeacher/>}></Route>

      </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
