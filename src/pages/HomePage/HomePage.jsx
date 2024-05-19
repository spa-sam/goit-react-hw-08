import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";

const HomePage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  return (
    <div>
      <h1>Welcome to the Homepage!</h1>
      {isLoggedIn ? (
        <div>
          <p>Hello, {user.name}!</p>
          <p>Your email: {user.email}</p>
        </div>
      ) : (
        <p>Please log in to access your contacts.</p>
      )}
    </div>
  );
};

export default HomePage;
