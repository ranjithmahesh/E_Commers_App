import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Alert from "react-bootstrap/Alert";

function Register() {
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    password: "",
  });
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
        "http://localhost:8000/api/auth/create",
        registrationData
      );

      navigation("/login");
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setServerError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <NavBar />
      <Container>
        <h1
          style={{ display: "flex", justifyContent: "center", marginTop: 75 }}
        >
          Register Page
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
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter name"
                value={registrationData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                value={registrationData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                value={registrationData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Text className="text-muted">
                Allready have an account{" "}
                <Link to={"/login"} style={{ color: "blue" }}>
                  LogIn
                </Link>
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default Register;
