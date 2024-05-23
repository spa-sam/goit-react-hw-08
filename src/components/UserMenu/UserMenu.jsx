import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import { NavLink } from "react-router-dom";
import css from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={css.userMenu}>
      <p className={css.userName}>Welcome, {user.name}</p>
      <NavLink to="/" className={css.logoutLink} onClick={handleLogout}>
        Logout
      </NavLink>
    </div>
  );
};

export default UserMenu;
