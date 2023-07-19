import * as React from "react";
import { Outlet,NavLink } from "react-router-dom";

function Layout() {
    return (
        <div>
          <ul>
            <li>
              <NavLink to="/login">Public Page</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Protected Page</NavLink>
            </li>
          </ul>
          <Outlet />
        </div>
      );
};

export default Layout;
