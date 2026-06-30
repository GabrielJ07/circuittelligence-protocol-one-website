import {Link} from 'react-router';
import {ProductCard} from '~/components/ProductCard';
import {SERIES_A_PRODUCTS} from '~/lib/products';
export default function Home(){return <main className="page"><section className="hero"><p className="eyebrow">Circuittelligence // Protocol:01</p><h1>Series-A — Protocol:01</h1><p className="lede">Beautiful Intelligence, Bounded.</p><div className="actions"><Link className="button secondary" to="/collections/series-a">Shop Series-A</Link><Link className="text-link" to="/pages/knowledge-base">Knowledge Base</Link></div></section><section className="grid">{SERIES_A_PRODUCTS.map(p=><ProductCard key={p.code} product={p}/>)}</section></main>}
