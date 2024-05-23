import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";

const AuthNav = () => {
  return (
    <div className={css.authNav}>
      <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? css.activeLink : css.link)}
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) => (isActive ? css.activeLink : css.link)}
      >
        Register
      </NavLink>
    </div>
  );
};

export default AuthNav;
