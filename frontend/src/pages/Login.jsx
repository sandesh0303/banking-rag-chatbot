import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const loginUser = async () => {
    try {
      const response = await fetch(
        "http://localhost:9294/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.message === "Login Successful") {

        localStorage.setItem("user", email);

        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        navigate("/chat");

      } else {

        setMessage(data.message);

      }

    } catch (error) {
      setMessage("Server Error");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#21468B",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "15px",
          width: "400px",
        }}
      >
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <button
          onClick={loginUser}
          style={{
            width: "100%",
            padding: "10px",
            background: "#21468B",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <p>{message}</p>

        <p>
          New User? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;