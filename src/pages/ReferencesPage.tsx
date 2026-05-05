import { Layout } from "../components/Layout";
import { SectionBlock } from "../components/SectionBlock";
import { leadershipSignals, references } from "../data/site";

export function ReferencesPage() {
  return (
    <Layout
      title="Highlights | Kaizer Charania"
      description="Selected outcome and leadership highlights for Kaizer Charania's technical leadership portfolio."
    >
      <SectionBlock
        eyebrow="Highlights"
        title="Selected outcome and scope highlights."
      >
        <div className="references-list">
          {references.map((item) => (
            <article className="reference-card" key={item}>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Leadership"
        title="Leadership signals behind the technical results."
      >
        <div className="references-list">
          {leadershipSignals.map((item) => (
            <article className="reference-card" key={item}>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </SectionBlock>
    </Layout>
  );
}
