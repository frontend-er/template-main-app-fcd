import { Link } from 'react-router-dom';

import { PATH_PAGE } from '~shared/lib/react-router';
import { FullPageWrapper } from '~shared/ui/full-page-wrapper';

import { Wrapper } from './styled';

export function Page404() {
  return (
    <FullPageWrapper>
      <Wrapper>
        <div className="container">
          <h1 className="logo-font">Page not found</h1>
          <p>Sorry, we couldn’t find the page you’re looking for.</p>
          <Link to={PATH_PAGE.root} className="btn btn-sm btn-outline-primary">
            Go back home
          </Link>
        </div>
      </Wrapper>
    </FullPageWrapper>
  );
}
