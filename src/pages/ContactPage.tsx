import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { site } from "../data/site";
import "../styles/support.scss";

const channels = [
  { label: "Email", value: site.email, detail: "Start a conversation", href: `mailto:${site.email}`, external: false },
  { label: "LinkedIn", value: "Connect & compare notes", detail: "Professional profile", href: site.linkedin, external: true },
  { label: "GitHub", value: "A closer look at the code", detail: "Projects & experiments", href: site.github, external: true },
];

export function ContactPage() {
  return (
    <Layout title="Let’s talk — Kaizer Charania" description="Get in touch with Kaizer Charania about backend systems, platform engineering, and applied AI workflows." frameClass="site-frame--support">
      <div className="support-page support-contact">
        <header className="support-hero"><p className="studio-eyebrow"><span className="status-dot"/> LET’S START A CONVERSATION</p><h1>Let’s build something<br/><span>that holds up.</span></h1><p className="support-lede">Backend platforms, AI workflows, or a complex engineering problem. I’m always interested in the thinking behind what you’re building.</p></header>
        <div className="support-contact__body"><div className="support-contact__aside"><span className="studio-eyebrow">DIRECT CHANNELS</span><p>{site.name}<br/><span>{site.location}</span></p><Link className="studio-text-link" to="/projects">Start with the work <span aria-hidden="true">↗</span></Link></div><div className="support-channels">{channels.map((channel, index) => <a className="support-channel" key={channel.label} href={channel.href} target={channel.external ? "_blank" : undefined} rel={channel.external ? "noreferrer" : undefined} data-analytics-event="contact_link_click" data-analytics-label={channel.label.toLowerCase()}><div className="support-channel__label"><span className="support-index">0{index + 1}</span><span>{channel.label}</span></div><div className="support-channel__copy"><h2>{channel.value}</h2><p>{channel.detail}</p></div><span className="support-channel__arrow" aria-hidden="true">↗</span></a>)}</div></div>
      </div>
    </Layout>
  );
}
