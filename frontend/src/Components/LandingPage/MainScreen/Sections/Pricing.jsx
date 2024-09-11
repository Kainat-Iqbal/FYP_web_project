import React from "react";
import styled from "styled-components";
// Components
import PricingTable from "../Elements/PricingTable";

export default function Pricing() {
  return (
    <Wrapper id="pricing">
      <div className="whiteBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold" style={{textAlign:"center", color:"#00304B"}}>Check Our Pricing</h1>
            <h2 className="font13" style={{color:"#00304B", fontSize:"19px", textAlign:"center", marginTop:"24px"}}> 
            Explore our competitive pricing options right here! We’ve crafted three distinct packages Starter, Basic, and Premium to suit a variety of needs. Whether you're just starting out, need more robust features, or want the full suite of premium services, you'll find the perfect fit for your budget below.
            </h2>
            {/* <p className="font13"Style={{color:"black"}}> 
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
              <br />
              labore et dolore magna aliquyam erat, sed diam voluptua.
            </p> */}
          </HeaderInfo>
          <TablesWrapper className="flexSpaceNull">
            <TableBox>
              <PricingTable
              
                icon="roller"
                rate ="$29.99/mo"
                title="Starter"
                des="Perfect for beginners to get started with essential features."
                ser={[
                  { name: "Result Creation", cheked: true },
                  { name: "Analytical Insights", cheked: true },
                  { name: "Chatbot Assistance", cheked: false },
                  { name: "Personalized Guidance", cheked: false },
                  { name: "Predict at-risk Students", cheked: false },
                ]}
                action={() => alert("clicked")}
              />
            </TableBox>
            <TableBox>
              <PricingTable
                icon="monitor"
                rate="$49.99/mo"
                title="Basic"
                des="Ideal for growing needs with advanced insights and tools."
                ser={[
                  { name: "Result Creation", cheked: true },
                  { name: "Analytical Insights", cheked: true },
                  { name: "Chatbot Assistance", cheked: true },
                  { name: "Personalized Guidance", cheked: false },
                  { name: "Predict at-risk Students", cheked: false },
                ]}
                action={() => alert("clicked")}
              />
            </TableBox>
            <TableBox>
              <PricingTable
                icon="browser"
                rate="$59.99/mo"
                title="Premium"
                des= "Comprehensive features for those who need it all."
                ser={[
                  { name: "Result Creation", cheked: true },
                  { name: "Analytical Insights", cheked: true },
                  { name: "Chatbot Assistance", cheked: true },
                  { name: "Personalized Guidance", cheked: true },
                  { name: "Predict at-risk Students", cheked: true },
                ]}
                action={() => alert("clicked")}
              />
            </TableBox>
          </TablesWrapper>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  padding: 50px 0;
`;
const HeaderInfo = styled.div`
  margin-bottom: 50px;
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const TablesWrapper = styled.div`
  @media (max-width: 860px) {
    flex-direction: column;
  }
`;
const TableBox = styled.div`
  width: 31%;
  @media (max-width: 860px) {
    width: 100%;
    max-width: 370px;
    margin: 0 auto
  }
`;




