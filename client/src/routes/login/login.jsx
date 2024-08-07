import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import "./login.scss";

function Login() {
  const { updateUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      setIsLoading(true);
      setError("");
      const res = await apiRequest.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      updateUser(res.data);
      
      navigate("/");
    } catch (err) {
      setError(err.response.data.errors[0].msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={formHandler}>
          <h1>Welcome back</h1>
          {error && <p className="error">{error}</p>}
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
