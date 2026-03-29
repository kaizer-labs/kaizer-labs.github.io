import "./styles/Career.css";
import { careerEntries } from "../data/portfolio";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {careerEntries.map((entry) => (
            <div className="career-info-box" key={`${entry.company}-${entry.period}`}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{entry.role}</h4>
                  <h5>{entry.company}</h5>
                </div>
                <h3>{entry.period}</h3>
              </div>
              <p>{entry.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
