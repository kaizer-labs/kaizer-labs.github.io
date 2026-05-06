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
      >
        <ol className="principle-list">
          {references.map((item, index) => (
            <li className="principle-list__item" key={item}>
              <span className="principle-list__index">0{index + 1}</span>
              <p>{item}</p>
            </li>
          ))}
        </ol>
      </SectionBlock>

      <SectionBlock
        eyebrow="Leadership"
      >
        <ol className="principle-list">
          {leadershipSignals.map((item, index) => (
            <li className="principle-list__item" key={item}>
              <span className="principle-list__index">0{index + 1}</span>
              <p>{item}</p>
            </li>
          ))}
        </ol>
      </SectionBlock>
    </Layout>
  );
}
