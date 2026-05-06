import { Layout } from "../components/Layout";

export function PrivacyPage() {
  return (
    <Layout
      title="Privacy | Kaizer Charania"
      description="Privacy note for the Kaizer Charania portfolio."
    >
      <section className="legal-page">
        <p className="section-kicker">Privacy</p>
        <h1>Privacy</h1>
        <p>
          This portfolio uses Google Analytics 4 to measure overall traffic and
          site behavior, including page views, approximate geography,
          referral/source data, device and browser context, scroll depth,
          section visibility, outbound link clicks, downloads, copy events, and
          time spent on pages. Analytics is enabled by default, and the footer
          cookie preferences control lets you switch to an essential-only mode
          that disables this tracking. A small local browser preference is
          stored so that choice persists on future visits. External destinations
          such as LinkedIn, GitHub, and other linked sites follow their own
          privacy policies.
        </p>
      </section>
    </Layout>
  );
}
