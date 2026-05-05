import { Layout } from "../components/Layout";

export function TermsPage() {
  return (
    <Layout
      title="Terms | Kaizer Charania"
      description="Terms note for the Kaizer Charania portfolio."
    >
      <section className="legal-page">
        <p className="section-kicker">Terms</p>
        <h1>Terms</h1>
        <p>
          This portfolio is provided as a personal engineering site and archive
          of work. The footer preference controls are available separately
          through the cookie preferences button.
        </p>
      </section>
    </Layout>
  );
}
