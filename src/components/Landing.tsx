import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { portfolioMeta } from "../data/portfolio";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>{portfolioMeta.landingGreeting}</h2>
            <h1>
              {portfolioMeta.firstName}
              <br />
              <span>{portfolioMeta.lastName}</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>{portfolioMeta.landingLead}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{portfolioMeta.landingWords[0]}</div>
              <div className="landing-h2-2">{portfolioMeta.landingWords[1]}</div>
            </h2>
            <h2>
              <div className="landing-h2-info">{portfolioMeta.landingEcho[0]}</div>
              <div className="landing-h2-info-1">{portfolioMeta.landingEcho[1]}</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
