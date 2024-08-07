import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import "./register.scss";
function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      setIsLoading(true);
      setError("");
      await apiRequest.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      // console.log(err.response.data.errors[0].msg);
      setError(err.response.data.errors[0].msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={formHandler}>
          <h1>Create an Account</h1>
          {error && <p className="error">{error}</p>}
          <input
            name="username"
            type="text"
            placeholder="Username"
            required
            minLength={4}
          />
          <input name="email" type="text" placeholder="Email" required />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            minLength={6}
          />
          <button disabled={isLoading}>Register</button>
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
