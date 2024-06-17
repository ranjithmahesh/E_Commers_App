import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { jwtDecode } from "jwt-decode";
import Alert from "react-bootstrap/Alert";

function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const navigation = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setShowAlert(true);
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        loginData
      );
      localStorage.setItem("token", res.data.token);
      const id = jwtDecode(res.data.token);
      localStorage.setItem("userID", JSON.stringify(id));
      navigation("/");
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setServerError(err.response?.data?.message || "Something went wrong");

      console.log(err.response?.data?.message);
    }
  };

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const passwordStrengthRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  return (
    <Container>
      <h1 style={{ display: "flex", justifyContent: "center", marginTop: 75 }}>
        LogIn Page
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          noValidate
          validated={validated}
          style={{ width: "500px" }}
          onSubmit={handleSubmit}
        >
          {serverError ? (
            <Alert variant="danger" dismissible>
              {serverError}
            </Alert>
          ) : (
            showAlert && (
              <Alert variant="danger" dismissible>
                Please fill out all fields.
              </Alert>
            )
          )}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              value={loginData.email}
              onChange={handleChange}
              required
              isInvalid={showAlert && !loginData.email}
            />
            <Form.Control.Feedback type="invalid">
              Email is required.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              required
              value={loginData.password}
              onChange={handleChange}
              isInvalid={showAlert && !loginData.password}
            />
            <Form.Control.Feedback type="invalid">
              Password is required.
            </Form.Control.Feedback>
            {/* {!passwordStrengthRegex.test(loginData.password) && (
                <Form.Text className="text-danger">
                  Password must contain at least one uppercase letter, one
                  lowercase letter, one digit, and be at least 8 characters
                  long.
                </Form.Text>
              )} */}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Text className="text-muted">
              Create a new account{" "}
              <Link to={"/register"} style={{ color: "blue" }}>
                Register
              </Link>
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Login;
