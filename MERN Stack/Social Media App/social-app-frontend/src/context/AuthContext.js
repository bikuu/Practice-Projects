import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id: "60df47b67aa2ca3bd82dd625",
    profilePicture: "",
    coverPicture: "",
    desc: "Born To Be Wild",
    city: "Sydney",
    from: "Aarubari",
    relationship: "In a Relationship",
    followers: [
      "60df47f87aa2ca3bd82dd627",
      "60df48087aa2ca3bd82dd629",
      "60df48137aa2ca3bd82dd62b",
    ],
    followings: [
      "60df47f87aa2ca3bd82dd627",
      "60df48087aa2ca3bd82dd629",
      "60df48137aa2ca3bd82dd62b",
    ],
    isAdmin: false,
    username: "Bibek",
    email: "bibek@gmail.com",
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
