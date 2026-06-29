import type {Route} from './+types/services';
import {Link} from 'react-router';
import {EditorialHeader} from '~/components/EditorialHeader';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Circuittelligence | Services'}];
};

export default function Services() {
  return (
    <article className="services">
      <EditorialHeader
        breadcrumb="SERVICES"
        title="Deployment, not consultation."
        abstract="PROTOCOL:01 builds bounded systems for operators who need to see exactly what they are running."
      />

      <div className="signal__narrative">
        <p>
          We do not sell roadmaps. We deploy systems — scoped, observable,
          and handed to the operator with the constraint already built in.
          Every engagement starts with the boundary, not the feature list.
        </p>
        <p>
          If you need a system that answers to you instead of surprising
          you, this is the doctrine we build to.
        </p>
      </div>

      <footer className="signal__footer">
        <Link to="/doctrine" className="signal__footer-cta">
          [DOCTRINE]
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
