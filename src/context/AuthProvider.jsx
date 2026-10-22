import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
// import { useNavigate } from "react-router-dom";

const initialState = {
  user: null,
  isAuthenticated: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown Action ❌");
  }
}
// Demo-only credentials. Replace with Supabase Auth for production (see README).
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
export function AuthProvider({ children }) {
  // const navigate = useNavigate();
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  function handleLogIn(email, password) {
    if (FAKE_USER.email === email && FAKE_USER.password === password) {
      dispatch({ type: "login", payload: FAKE_USER });
      // navigate("app");
    }
  }
  function handleLogOut() {
    dispatch({ type: "logout" });
    // navigate("/");
  }
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, handleLogIn, handleLogOut }}>
      {children}
    </AuthContext.Provider>
  );
}
