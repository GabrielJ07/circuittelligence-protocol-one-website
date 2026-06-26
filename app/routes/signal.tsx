import type {Route} from './+types/signal';
import {Link} from 'react-router';
import {EditorialHeader} from '~/components/EditorialHeader';
import {TerminalBlock} from '~/components/TerminalBlock';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Circuittelligence | Signal'}];
};

export default function Signal() {
  return (
    <article className="signal">
      <EditorialHeader
        breadcrumb="SIGNAL"
        title="Governed intelligence, deployed to the field."
        abstract="A transmission on what it means to build hardware that answers to the operator, not the model."
      />

      <div className="signal__narrative">
        <p>
          Every system we ship begins with a constraint, not a feature list.
          The constraint is the point — it is what separates a tool from a
          black box. PROTOCOL:01 exists to prove that intelligence can be
          beautiful and bounded at the same time.
        </p>
        <p>
          The operator does not need a system that surprises them. They need
          one that is observable, predictable, and theirs. That is the
          doctrine this signal carries forward.
        </p>
      </div>

      <figure className="signal__image">
        <div className="signal__image-placeholder" aria-hidden />
        <figcaption>PROTOCOL:01 — field deployment, Hillcrest node.</figcaption>
      </figure>

      <div className="signal__narrative">
        <p>
          What follows is a live transmission — a record of the handshake
          between operator and system at the moment of deployment.
        </p>
      </div>

      <TerminalBlock />

      <footer className="signal__footer">
        <Link to="/services" className="signal__footer-cta">
          [SERVICES]
        </Link>
        <Link to="/shop-men" className="signal__footer-cta">
          [SHOP MEN]
        </Link>
        <Link to="/shop-women" className="signal__footer-cta">
          [SHOP WOMEN]
        </Link>
      </footer>
    </article>
  );
}
