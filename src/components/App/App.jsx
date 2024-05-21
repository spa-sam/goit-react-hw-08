import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { refreshUser } from "../../redux/auth/operations";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "../routes/PrivateRoute";
import RestrictedRoute from "../routes/RestrictedRoute";
import HomePage from "../../pages/HomePage/HomePage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";
import ContactsPage from "../../pages/ContactsPage/ContactsPage";
import Layout from "../Layout/Layout";

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      {!isRefreshing && (
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/login"
                element={<RestrictedRoute component={LoginPage} />}
              />
              <Route
                path="/register"
                element={<RestrictedRoute component={RegistrationPage} />}
              />
              <Route path="/contacts" element={<PrivateRoute />}>
                <Route path="" element={<ContactsPage />} />
              </Route>
            </Routes>
          </Layout>
          <Toaster />
        </Router>
      )}
    </>
  );
};

export default App;
