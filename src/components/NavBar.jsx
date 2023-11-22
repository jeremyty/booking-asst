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
          <Image src={logo} alt="salon Logo" roundedCircle style={{ width: 50 }} />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={handleShow}>Book Now</Nav.Link>
          <NewBookingModal show={show} handleClose={handleClose} />
        </Nav>
        <Nav>
          <Nav.Link onClick={handleLogout}>
            <i className="bi bi-door-closed" /> Logout
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>

  )
}


