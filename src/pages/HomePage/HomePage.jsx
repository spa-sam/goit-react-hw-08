import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { Container, Typography, Box, Paper } from "@mui/material";

const HomePage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h2" align="center" gutterBottom>
          Welcome to the Contacts Book!
        </Typography>
        {isLoggedIn ? (
          <Paper
            elevation={3}
            sx={{ padding: 4, marginTop: 4, textAlign: "center" }}
          >
            <Typography variant="h4" gutterBottom>
              Hello, {user.name}!
            </Typography>
            <Typography variant="body1">Your email: {user.email}</Typography>
          </Paper>
        ) : (
          <Paper
            elevation={3}
            sx={{ padding: 4, marginTop: 4, textAlign: "center" }}
          >
            <Typography variant="h5" gutterBottom>
              Please log in to access your contacts.
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;
