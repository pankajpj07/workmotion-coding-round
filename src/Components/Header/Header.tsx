import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

interface HeaderProps {}
const Header = (props: HeaderProps) => {
  return (
    <>
      <Navbar
        style={{
          backgroundColor: "#00362e",
          width: "100%",
          zIndex: 3,
        }}
        variant="dark"
      >
        <Container>
          <Navbar.Brand href="/">
            <img
              src="https://workmotion.com/wp-content/uploads/2021/12/logo-workmotion.svg"
              alt=""
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Add Employee</Nav.Link>
            <Nav.Link href="/check-employee">Check Employee</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
