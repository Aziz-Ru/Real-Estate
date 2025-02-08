import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { login } from "../../lib/requests";
import "./login.scss";

function Login() {
  // const { updateUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onError: (error) => {
      setError(error.response.data.errors.message);
    },
    onSuccess: () => {
      navigate("/");
    },
  });

  const formHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const data = { email, password };
    mutate(data);
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={formHandler}>
          <h1>Welcome back</h1>
          {error && <span className="error">{error}</span>}
          <input name="email" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
