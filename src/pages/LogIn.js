import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
const LogIn = () => {
  const [LoginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const { signIn, loading, setLoading } = useContext(AuthContext);
  const handleLogin = (event) => {
    event.preventDefault();
    setLoginError("");
    const form = event.target;
    const userInfo = {
      email: form.email.value,
      password: form.password.value,
      submit: form.submit,
    };
    userInfo.submit.disabled = true;
    signIn(userInfo.email, userInfo.password)
      .then((result) => {
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setLoginError(error.message);
        userInfo.submit.disabled = false;
      });
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        {LoginError && <h3 style={{ color: "red" }}>{LoginError}</h3>}

        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <br />
        <input type="submit" name="submit" value="Submit" />
      </form>
      <Link to="/forgot-password">Forgot Password</Link>
    </div>
  );
};

export default LogIn;
