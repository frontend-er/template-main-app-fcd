import { NavLink, Outlet } from 'react-router-dom';

import { PATH_PAGE } from '~shared/lib/react-router';

export function MainLayout() {
  return (
    <>
      <nav className="navbar navbar-light">
        <div className="container">
          <NavLink className="navbar-brand" to={PATH_PAGE.root}>
            Main app name
          </NavLink>
        </div>
      </nav>
      <Outlet />
      <footer>
        <div className="container">
          <NavLink className="logo-font" to={PATH_PAGE.root}>
            Main app name
          </NavLink>
          <span className="attribution">
            . Code &amp; design licensed under Bajenov Dmitri.
          </span>
        </div>
      </footer>
    </>
  );
}
