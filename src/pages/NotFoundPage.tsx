import { Layout } from "../components/Layout";

export function NotFoundPage() {
  return (
    <Layout
      title="Page not found | Kaizer Charania"
      description="The requested page could not be found."
      frameClass="site-frame--home"
    >
      <section className="legal-page">
        <p className="section-kicker">404</p>
        <h1>Page not found</h1>
        <p>The route you requested does not exist in this portfolio.</p>
      </section>
    </Layout>
  );
}

