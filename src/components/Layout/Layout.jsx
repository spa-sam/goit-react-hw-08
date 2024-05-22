import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import { AppBar, Toolbar, Container, Box } from "@mui/material";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box className={styles.container}>
      <AppBar position="static">
        <Toolbar>
          <Box className={styles.navigation}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Home
            </NavLink>
            {isLoggedIn && (
              <NavLink
                to="/contacts"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.link
                }
              >
                Contacts
              </NavLink>
            )}
          </Box>
          <Box className={styles.authLinks}>
            {isLoggedIn ? (
              <NavLink to="/" className={styles.link} onClick={handleLogout}>
                Logout
              </NavLink>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : styles.link
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : styles.link
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Container component="main" className={styles.main}>
        {children}
      </Container>
      <Box component="footer" className={styles.footer}>
        <p>&copy; 2024 My App. All rights reserved.</p>
      </Box>
    </Box>
  );
};

export default Layout;
