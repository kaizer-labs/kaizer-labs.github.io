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
          This portfolio may use Google Analytics to understand overall traffic
          and page usage. The built-in preference control still stores a small
          local setting in the browser so the site experience feels integrated
          rather than outsourced. External destinations such as LinkedIn,
          GitHub, and other linked sites follow their own privacy policies.
        </p>
      </section>
    </Layout>
  );
}
