import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Navigation from "../Navigation/Navigation";
import AuthNav from "../AuthNav/AuthNav";
import UserMenu from "../UserMenu/UserMenu";
import { AppBar, Toolbar, Container, Box } from "@mui/material";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Box className={styles.container}>
      <AppBar position="static">
        <Toolbar>
          <Navigation />
          {isLoggedIn ? <UserMenu /> : <AuthNav />}
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
