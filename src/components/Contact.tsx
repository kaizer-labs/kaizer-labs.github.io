import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { contactLinks, portfolioMeta } from "../data/portfolio";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            {contactLinks.connect.map((link) => (
              <p key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="disable"
                >
                  {link.label}
                </a>
              </p>
            ))}
            <h4>Focus</h4>
            {contactLinks.focusLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            {contactLinks.social.map((link) => (
              <a
                href={link.href}
                key={link.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
                className="contact-social"
              >
                {link.label} <MdArrowOutward />
              </a>
            ))}
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>{portfolioMeta.name}</span>
            </h2>
            <h5>
              <MdCopyright /> {new Date().getFullYear()}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
