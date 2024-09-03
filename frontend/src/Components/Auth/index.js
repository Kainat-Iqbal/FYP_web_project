import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "../LandingPage/LoginPage";

const Auth = (props) =>{
const [isAuth, setAuth] = useState(false);
const nav = useNavigate();
const getUser = async()=>{
if (localStorage.getItem("user")) {
    setAuth(true);
}
else{
    nav("/login");
}
}
useEffect(()=>{getUser()},[]);
return(
    <>
   {!isAuth ? (
    <LoginPage/>
   ): 
    props.children
    }
    </>
);
};
export default Auth;