import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const { createUser, updateUser, loading, setLoading } =
    useContext(AuthContext);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const userInfo = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      cpassword: form.cpassword.value,
      submit: form.submit,
    };
    if (!(userInfo.cpassword === userInfo.password)) {
      setError("Confirm password must be equal to password");
      return;
    }
    userInfo.submit.disabled = true;
    createUser(userInfo.email, userInfo.password)
      .then((result) => {
        const userName = {
          displayName: userInfo.name,
        };
        setSuccess("User created successfully");
        updateUser(userName)
          .then((result) => {
            form.reset();
            navigate("/");
          })
          .catch((err) => {
            userInfo.submit.disabled = false;
            setLoading(false);
            setError(err.message);
          });
      })
      .catch((err) => {
        userInfo.submit.disabled = false;
        setLoading(false);
        setError(err.message);
      });
  };
  return (
    <div>
      {" "}
      <form onSubmit={handleRegister}>
        {error && <h3 style={{ color: "red" }}>{error}</h3>}
        {success && <h3 style={{ color: "green" }}>{success}</h3>}
        <label>
          Name:
          <input type="name" required name="name" />
        </label>
        <br />
        <label>
          Email:
          <input type="email" required name="email" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" required name="password" />
        </label>
        <br />
        <label>
          Confirm Password:
          <input type="password" required name="cpassword" />
        </label>
        <br />
        <input type="submit" name="submit" value="Submit" />
      </form>
      <Link to="/">
        <button
          style={{
            backgroundColor: "green",
            color: "white",
            textDecoration: "none",
            padding: "6px 10px",
            borderRadius: "25px",
            marginTop: "20px",
            border: "none",
          }}
        >
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default Register;
