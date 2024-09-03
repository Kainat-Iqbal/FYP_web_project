import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link as ScrollLink } from "react-scroll";
import { NavLink } from "react-router-dom";

// Components
import Sidebar from "../Nav/Sidebar";
import Backdrop from "../Elements/Backdrop";
// Assets
import logo from './FYPLogo.png';
import BurgerIcon from "../../../../assets/svg/BurgerIcon";

function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
  }, [y]);

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper className="flexCenter animate whiteBg" style={y > 100 ? { height: "60px" } : { height: "80px" }}>
        <NavInner className="container flexSpaceCenter">
          <ScrollLink className="pointer flexNullCenter" to="home" smooth={true}>
            <img style={{ width: "5vw", height: "10vh", marginLeft: "-34px" }} src={logo} alt="logo" id="logo" />
            <h1 style={{ color: "#00304B", fontSize: "23px", marginLeft: "15px" }} className="font20 extraBold">
              Academic Accelerator Pro
            </h1>
          </ScrollLink>
          <BurderWrapper className="pointer" onClick={() => toggleSidebar(!sidebarOpen)}>
            <BurgerIcon />
          </BurderWrapper>
          <UlWrapper className="flexNullCenter">
            <li className="semiBold font15 pointer">
              <ScrollLink activeClass="active" style={{ padding: "10px 15px", fontSize: "19px" }} to="home" spy={true} smooth={true} offset={-80}>
                Home
              </ScrollLink>
            </li>
            <li className="semiBold font15 pointer">
              <ScrollLink activeClass="active" style={{ padding: "10px 15px", fontSize: "19px" }} to="services" spy={true} smooth={true} offset={-80}>
                Services
              </ScrollLink>
            </li>
            <li className="semiBold font15 pointer">
              <ScrollLink activeClass="active" style={{ padding: "10px 15px", fontSize: "19px" }} to="projects" spy={true} smooth={true} offset={-80}>
                About Us
              </ScrollLink>
            </li>
            <li className="semiBold font15 pointer">
              <ScrollLink activeClass="active" style={{ padding: "10px 15px", fontSize: "19px" }} to="pricing" spy={true} smooth={true} offset={-80}>
                Pricing
              </ScrollLink>
            </li>
            <li className="semiBold font15 pointer">
              <ScrollLink activeClass="active" style={{ padding: "10px 15px", fontSize: "19px" }} to="contact" spy={true} smooth={true} offset={-80}>
                Contact
              </ScrollLink>
            </li>
          </UlWrapper>

          <UlWrapperRight className="flexNullCenter">
            <li className="semiBold font15 pointer flexCenter">
              <NavLink to="/login" style={{ textDecoration: 'none', color: '#00304B' }}>
                <div
                  className="radius8 lightBg"
                  style={{
                    padding: '10px 34px',
                    color: '#00304B',
                    background: 'linear-gradient(to right, #93C098, #BCE0B8)',
                    fontSize: '19px',
                  }}
                >
                  Log in
                </div>
              </NavLink>
            </li>
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;
const NavInner = styled.div`
  position: relative;
  height: 100%;
`;
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;
const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;

export default TopNavbar;















// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { Link } from "react-scroll";


// // Components
// import Sidebar from "../Nav/Sidebar";
// import Backdrop from "../Elements/Backdrop";
// // Assets
// import logo from './FYPLogo.png';
// // import LogoIcon from "../../../../assets/svg/Logo";
// import BurgerIcon from "../../../../assets/svg/BurgerIcon";

// function TopNavbar() {

//   const [y, setY] = useState(window.scrollY);
//   const [sidebarOpen, toggleSidebar] = useState(false);

//   useEffect(() => {
//     window.addEventListener("scroll", () => setY(window.scrollY));
//     return () => {
//       window.removeEventListener("scroll", () => setY(window.scrollY));
//     };
//   }, [y]);


//   return (
//     <>
//       <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
//       {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
//       <Wrapper className="flexCenter animate whiteBg" style={y > 100 ? { height: "60px" } : { height: "80px" }}>
//         <NavInner className="container flexSpaceCenter">
//           <Link className="pointer flexNullCenter" to="home" smooth={true}>

//             {/* <LogoIcon /> */}
//             <img style={{ width: "5vw", height: "10vh", marginLeft: "-34px" }} src={logo} alt="logo" id="logo" />
//             <h1 style={{ color: "#00304B", fontSize: "23px", marginLeft: "15px" }} className="font20 extraBold">
//               Academic Accelerator Pro
//             </h1>
//           </Link>
//           <BurderWrapper className="pointer" onClick={() => toggleSidebar(!sidebarOpen)}>
//             <BurgerIcon />
//           </BurderWrapper>
//           <UlWrapper className="flexNullCenter">
//             <li className="semiBold font15 pointer">
//               <Link activeClass="active" style={{ padding: "10px 15px", fontSize: "19px" }} to="home" spy={true} smooth={true} offset={-80}>
//                 Home
//               </Link>
//             </li>
//             <li className="semiBold font15 pointer">
//               <Link activeClass="active" style={{ padding: "10px 15px", fontSize: "19px" }} to="services" spy={true} smooth={true} offset={-80}>
//                 Services
//               </Link>
//             </li>
//             <li className="semiBold font15 pointer">
//               <Link activeClass="active" style={{ padding: "10px 15px", fontSize: "19px" }} to="projects" spy={true} smooth={true} offset={-80}>
//                 About Us
//               </Link>
//             </li>
//             {/* <li className="semiBold font15 pointer">
//               <Link activeClass="active" style={{ padding: "10px 15px", fontSize: "19px" }} to="blog" spy={true} smooth={true} offset={-80}>
//                 Blog
//               </Link>
//             </li> */}
//             <li className="semiBold font15 pointer">
//               <Link activeClass="active" style={{ padding: "10px 15px", fontSize: "19px" }} to="pricing" spy={true} smooth={true} offset={-80}>
//                 Pricing
//               </Link>
//             </li>
//             <li className="semiBold font15 pointer">
//               <Link activeClass="active" style={{ padding: "10px 15px", fontSize: "19px" }} to="contact" spy={true} smooth={true} offset={-80}>
//                 Contact
//               </Link>
//             </li>
//           </UlWrapper>

//           <UlWrapperRight className="flexNullCenter">
//           <li className="semiBold font15 pointer flexCenter">
//             <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
//               <div
//                 className="radius8 lightBg"
//                 style={{
//                   padding: '10px 34px',
//                   color: '#003B45',
//                   background: 'linear-gradient(to right, #93C098, #BCE0B8)',
//                   fontSize: '19px',
//                 }}
//               >
//                 Log in
//               </div>
//             </Link>
//           </li>
              
//           </UlWrapperRight>


//           {/* <UlWrapperRight className="flexNullCenter">
//             <li className="semiBold font15 pointer flexCenter">
//               <li href="/" className="radius8 lightBg"
//                 style={{
//                   padding: "10px 34px",
//                   color: "#00304B",
//                   background: "linear-gradient(to right, #93C098, #8CE0DB)",
//                   fontSize: "19px"
//                 }}>  
//                 Log in
//               </li>

//             </li>
//           </UlWrapperRight> */}
//         </NavInner>
//       </Wrapper>
//     </>
//   );
// }

// const Wrapper = styled.nav`
//   width: 100%;
//   position: fixed;
//   top: 0;
//   left: 0;
//   z-index: 999;
// `;
// const NavInner = styled.div`
//   position: relative;
//   height: 100%;
// `
// const BurderWrapper = styled.button`
//   outline: none;
//   border: 0px;
//   background-color: transparent;
//   height: 100%;
//   padding: 0 15px;
//   display: none;
//   @media (max-width: 760px) {
//     display: block;
//   }
// `;
// const UlWrapper = styled.ul`
//   display: flex;
//   @media (max-width: 760px) {
//     display: none;
//   }
// `;
// const UlWrapperRight = styled.ul`
//   @media (max-width: 760px) {
//     display: none;
//   }
// `;


// export default TopNavbar;