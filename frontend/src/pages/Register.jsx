import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const registerUser = async () => {
    try {
      const response = await fetch(
        "http://localhost:9294/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      setMessage(data.message);

      if (data.message === "Registration Successful") {
        setTimeout(() => {
          navigate("/");
        }, 1000);
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
          boxShadow: "0 0 20px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          Register
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

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
          onClick={registerUser}
          style={{
            width: "100%",
            padding: "12px",
            background: "#21468B",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Register
        </button>

        <p
          style={{
            textAlign: "center",
            color: "green",
            marginTop: "10px",
          }}
        >
          {message}
        </p>

        <p style={{ textAlign: "center" }}>
          Already Registered?{" "}
          <Link to="/">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;