import type {Route} from './+types/series-a';
import {Link} from 'react-router';
import {EditorialHeader} from '~/components/EditorialHeader';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Circuittelligence | Series-A'}];
};

export default function SeriesA() {
  return (
    <article className="series-a">
      <EditorialHeader
        breadcrumb="SERIES-A"
        title="Funding the next deployment."
        abstract="Series-A capital extends the runway for PROTOCOL:01. Every payload deployed reinvests directly into the next system."
      />

      <div className="signal__narrative">
        <p>
          Series-A is not a marketing event. It is the mechanism by which
          revenue from deployed payloads becomes the next system. Capital
          committed here funds hardware, fulfillment, and the doctrine
          itself.
        </p>
        <p>
          The store opens and closes. Products are deployed, not browsed.
          What is raised in this round determines what gets built next.
        </p>
      </div>

      <footer className="signal__footer">
        <Link to="/shop-men" className="signal__footer-cta">
          [SHOP MEN]
        </Link>
        <Link to="/shop-women" className="signal__footer-cta">
          [SHOP WOMEN]
        </Link>
        <Link to="/shop-artifacts" className="signal__footer-cta">
          [SHOP ARTIFACTS]
        </Link>
      </footer>
    </article>
  );
}
