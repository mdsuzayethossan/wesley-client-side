import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../contexts/AuthProvider";

const ForgotPassword = () => {
  const { forgotEmail } = useContext(AuthContext);
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
        toast.success("Password reset email sent!");
      })
      .catch((error) => {
        const errorMessage = error.message;
        userInfo.submit.disabled = false;
        toast.error(errorMessage);
      });
  };
  return (
    <div>
      <form onSubmit={handleForgotPassword}>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <br />
        <input type="submit" name="submit" value="Submit" />
      </form>
    </div>
  );
};

export default ForgotPassword;
