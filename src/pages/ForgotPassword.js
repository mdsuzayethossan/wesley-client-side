import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const ForgotPassword = () => {
  const { forgotEmail } = useContext(AuthContext);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const handleForgotPassword = (event) => {
    event.preventDefault();
    const form = event.target;
    const userInfo = {
      email: form.email.value,
      submit: form.submit,
    };
    userInfo.submit.disabled = true;
    forgotEmail(userInfo.email)
      .then(() => {
        setSuccess("Password reset email sent!");
      })
      .catch((error) => {
        const errorMessage = error.message;
        userInfo.submit.disabled = false;
        setError(errorMessage);
      });
  };
  return (
    <div>
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      {success && <h3 style={{ color: "green" }}>{success}</h3>}
      <form onSubmit={handleForgotPassword}>
        <label>
          Email:
          <input type="email" required name="email" />
        </label>
        <br />
        <input type="submit" name="submit" value="Submit" />
      </form>
    </div>
  );
};

export default ForgotPassword;
