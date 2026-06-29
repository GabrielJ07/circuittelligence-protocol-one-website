import type {Route} from './+types/doctrine';
import {Link} from 'react-router';
import {EditorialHeader} from '~/components/EditorialHeader';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Circuittelligence | Doctrine'}];
};

export default function Doctrine() {
  return (
    <article className="doctrine">
      <EditorialHeader
        breadcrumb="DOCTRINE"
        title="CONSTRAINT is the POINT."
        abstract="The operating principle behind every system PROTOCOL:01 deploys: governed intelligence, not unbounded intelligence."
      />

      <div className="signal__narrative">
        <p>
          We do not build systems that surprise the operator. We build
          systems that answer to them. A constraint is not a limitation
          bolted on after the fact — it is the first design decision, the
          one every other decision has to survive.
        </p>
        <p>
          Observable. Predictable. Theirs. That is the doctrine. Everything
          PROTOCOL:01 ships is judged against it before it is judged against
          anything else.
        </p>
      </div>

      <footer className="signal__footer">
        <Link to="/services" className="signal__footer-cta">
          [SERVICES]
        </Link>
        <Link to="/signal" className="signal__footer-cta">
          [SIGNAL]
        </Link>
        <Link to="/fund" className="signal__footer-cta">
          [FUND]
        </Link>
      </footer>
    </article>
  );
}
