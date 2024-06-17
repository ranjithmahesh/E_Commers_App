import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Corrected import
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { useModal } from "../ModalContext";
import Logo from "../utils/logo.svg";
import Modals from "./Modal";
import axios from "axios";

function NavBar() {
  const { lgShow, handleShow, handleClose } = useModal();
  const [userExist, setUserExist] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setUserExist(true);
      getUserNameApi();
    }
  }, [token]);

  const capitalizeFirstLetter = (str) => {
    {
      return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
  };
  const getUserNameApi = async () => {
    await axios
      .get("http://localhost:8000/api/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUserName(capitalizeFirstLetter(res.data.UserDeatil.name) || "");
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserExist(false);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={Logo} alt="TrendBazaar" className="me-2" />
          TrendBazaar
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="/">Home</Nav.Link>
            {userExist ? (
              <>
                <Nav.Link href="#" onClick={handleShow}>
                  Create Product
                </Nav.Link>
                <Nav.Link href="/list">My List</Nav.Link>
                <Modals
                  lgShow={lgShow}
                  handleShow={handleShow}
                  handleClose={handleClose}
                />
                <NavDropdown title={userName} id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/login" onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Button onClick={() => navigate("/login")}>Login</Button> // Updated to use navigate
            )}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
