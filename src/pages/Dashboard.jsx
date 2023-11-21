import { getAuth } from "firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import { Container, Row } from "react-bootstrap";
import ProfilePostCard from "../components/ProfilePostCard";

export default function Dashboard() {
    const auth = getAuth();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    //check if no token
      if(!currentUser) {
          navigate("/login");
      }
   
    const handleLogout = () => {
      auth.signOut();
    };


return (
    <>
    <Container>
      <Row>
       <ProfilePostCard handleLogout={handleLogout} />
      </Row>
    </Container>
  </>
)

}
