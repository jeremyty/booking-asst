import { Container, Image, Nav, Navbar } from "react-bootstrap";
import NewBookingModal from "./NewBookingModal";
import { useState } from "react";

export default function NavBar({ handleLogout }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const logo = "data:image/png;base64,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"

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" >
      <Container>
        <Navbar.Brand href="dashboard">
          <Image src={logo} alt="Uni Logo" roundedCircle style={{ width: 80 }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link onClick={handleShow}>Book Now</Nav.Link>
          <NewBookingModal show={show} handleClose={handleClose} />
        </Nav>
        <Nav variant="underline" className="me-auto align-center" style={{fontSize: 30}}>
          <Nav.Link>My Booking</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={handleLogout}>
            <i className="bi bi-door-closed" /> Logout
          </Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}


