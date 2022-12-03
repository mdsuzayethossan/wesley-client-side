import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Register = () => {
  const navigate = useNavigate();
  const { createUser, updateUser, loading, setLoading } =
    useContext(AuthContext);
  const [cpasswordErr, setCpasswordErr] = useState();
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
      setCpasswordErr("Confirm password must be equal to password");
      return;
    }
    userInfo.submit.disabled = true;
    createUser(userInfo.email, userInfo.password)
      .then((result) => {
        toast.success("User Created Successfully.");
        const userName = {
          displayName: userInfo.name,
        };
        updateUser(userName)
          .then((result) => {
            form.reset();
            navigate("/");
          })
          .catch((err) => {
            userInfo.submit.disabled = false;
            setLoading(false);
            toast.error(err.message);
          });
      })
      .catch((err) => {
        userInfo.submit.disabled = false;
        setLoading(false);
        toast.error(err.message);
      });
  };
  return (
    <form onSubmit={handleRegister}>
      {cpasswordErr && <h2 style={{ color: "red" }}>{cpasswordErr}</h2>}
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
  );
};

export default Register;
