import { Provider } from "react-redux";
import Routes from "./routes/Routes";
import store from "./store/store";
import { setAuthToken } from "./utils";
import { setCurrentUser, logoutUser } from "./store/action";
import jwt_decode from "jwt-decode";
import './App.css';




if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser());
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
  }
}




const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
