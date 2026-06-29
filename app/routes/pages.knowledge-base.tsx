import type {MetaFunction} from 'react-router';
import {Link} from 'react-router';
import {CANONICAL_SOURCE_PATH} from '~/lib/brand';

export const meta: MetaFunction = () => [
  {title: 'Knowledge Base — Circuittelligence // Protocol:01 // Series-A'},
  {name: 'description', content: 'Canonical Circuittelligence / Protocol:01 / Series-A source document.'},
];

export default function KnowledgeBase() {
  return (
    <main className="page">
      <header className="section-head">
        <p className="eyebrow">Canonical source</p>
        <h1>Knowledge Base</h1>
        <p>The uploaded HTML file is served directly and embedded below.</p>
        <Link className="text-link" to={CANONICAL_SOURCE_PATH}>Open exact source HTML</Link>
      </header>
      <section className="frame-shell"><iframe title="Circuittelligence Knowledge Base" src={CANONICAL_SOURCE_PATH} className="canonical-frame" /></section>
    </main>
  );
}
