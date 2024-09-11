import React from "react";
import styled from "styled-components";
// Components
import FullButton from "../Buttons/FullButton";
// Assets
import RollerIcon from "../../../../assets/svg/Services/RollerIcon";
import MonitorIcon from "../../../../assets/svg/Services/MonitorIcon";
import BrowserIcon from "../../../../assets/svg/Services/BrowserIcon";
import PrinterIcon from "../../../../assets/svg/Services/PrinterIcon";
import CheckMark from "../../../../assets/svg/Checkmark";

export default function PricingTable({ icon, rate, title, des, ser, action }) {
  let getIcon;

  switch (icon) {
    case "roller":
      getIcon = <RollerIcon />;
      break;
    case "monitor":
      getIcon = <MonitorIcon />;
      break;
    case "browser":
      getIcon = <BrowserIcon />;
      break;
    case "printer":
      getIcon = <PrinterIcon />;
      break;
    default:
      getIcon = <RollerIcon />;
      break;
  }

  return (
    <Wrapper className="whiteBg radius8 shadow" style={{marginTop:"-7px"}}>
      <div className="flexSpaceCenter" style={{}}>
        <h1 style={{marginTop:"8px"}}>{getIcon}</h1>
        <p className="font25" style={{color:"#00304B", marginTop:"11px"}}>{rate}</p>
      </div>
      
      <div style={{ margin: "30px 0" }}>
        <h4 className="font25 extraBold" style={{color:"#00304B",marginTop:'-3vh'}}>{title}</h4>
        <p className="font13" style={{color:"#00304B", marginTop:"11px",fontSize:"19px", alignItems:"justify"}}>{des}</p>
      </div>
      <div>
        {ser
          ? ser.map((item, index) => (    
              <div className="flexNullCenter" style={{ margin: "15px 0"}} key={index}>
                <div style={{ position: "relative", top: "-1px", marginRight: "15px", color:"#00304B",marginTop:'-3vh' }}>
                  {item.cheked ? (
                    <div style={{ minWidth: "20px",marginTop:'-3vh'}}>
                      <CheckMark />
                    </div>
                  ) : (
                    <div style={{ minWidth: "20px",marginTop:'-3vh'}}></div>
                  )}
                </div>
                <p className="font20 semiBold" style={{color:"#00304B",marginTop:'-3vh'}}>{item.name}</p>
              </div>
            ))
          : null}
      </div>
      <div  style={{ maxWidth: "120px", margin: "30px auto 0 auto" ,marginTop:'-3vh'}}>
        <FullButton  title="Buy" action={action}  />
      </div>
    </Wrapper>
  );
}


const Wrapper = styled.div`
  width: 100%;
  text-align: left;
  padding: 20px 30px;
  margin-top: 30px;
`;
