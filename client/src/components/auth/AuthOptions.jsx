// import React from "react";
// import { useHistory } from "react-router-dom";

// export default function AuthOptions() {
//   const register = () => history.push("/register");
//   const login = () => history.push("/login");
//   const logout = () => {};
//   const history = useHistory();
//   return (
//     <nav className="auth-options">
//       <button onClick={logout}>Log out</button>
//       <>
//         <button onClick={register}>Register</button>
//         <button onClick={login}>Log in</button>
//       </>
//     </nav>
//   );
// }

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  function handleLogOut() {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  }

  return (
    <>
      <nav className="auth-options">
        {userData.user ? (
          <Link onClick={handleLogOut} to={"/"}>
            <button>Log Out</button>
          </Link>
        ) : (
          <>
            <Link to={"/register"}>
              <button>Register</button>
            </Link>
            <Link to={"/login"}>
              <button>Log In</button>
            </Link>
          </>
        )}
      </nav>
    </>
  );
}
