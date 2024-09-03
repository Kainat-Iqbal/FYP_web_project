import React from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
// Assets

import logo from './FYPLogo.png';

export default function Contact() {

  const getCurrentYear = () => {
    return new Date().getFullYear();
  }

  return (
    <Wrapper>
      <div className="darkBg" style={{  
                  background: "linear-gradient(to right, #93C098, #8CE0DB)", textAlign:"center", justifyContent:"center"}}>
        
        <div className="container">
          <InnerWrapper className="flexSpaceCenter" style={{ padding: "30px 0" }}>

            <Link className="flexCenter animate pointer" to="home" smooth={true} offset={-80}>
            <img style={{ width: "5vw", height: "10vh", marginLeft: "-34px" }} src={logo} alt="logo" id="logo" />
              <h1 className="font15 extraBold whiteColor" style={{ marginLeft: "15px", color: "#00304B",fontSize: "22px",marginTop:"17px" }}>
               Academic Accelerator Pro
              </h1>
            </Link>
            
            <StyleP className="whiteColor font13" style={{ color: "#00304B",fontSize: "19px", marginLeft:"-160px",marginTop:"20px" }}>
              © {getCurrentYear()} - <span className="purpleColor font13" style={{ color: "#00304B",fontSize: "19px"}}>Academic Accelerator Pro</span> All Right Reserved
            </StyleP>

            <Link className="whiteColor animate pointer font13" style={{ fontSize:"19px",color: "#00304B" }} to="home" smooth={true} offset={-80}>
              Back to top
            </Link>
          </InnerWrapper>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;
const InnerWrapper = styled.div`
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
const StyleP = styled.p`
  @media (max-width: 550px) {
    margin: 20px 0;
  }
`;