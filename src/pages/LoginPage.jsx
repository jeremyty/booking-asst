import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const auth = getAuth();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [action, setAction] = useState("Log In");
    const [confirm, setConfirm] = useState("");


      // signup
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        username,
        password
        );
      console.log(res.user);
    } catch (error) {
      console.error(error);
    }
  };

  //login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, username, password);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

    return (
        <Container className="d-flex justify-content-center vh-100 bg-light">
            

    <Form onSubmit={action === "Log In" ? handleLogin : handleSignUp}>
        <h1 className="my-3 text-center">{action}</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            <i className="bi bi-envelope"></i>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            <i className="bi bi-lock"></i>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        {action === "Log In" ? (
          <Form.Group></Form.Group>
        ) : (
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
              }}
            />
          </Form.Group>
        )}
       
        <Button
          className={action === "Log In" ? "gray" : "submit"}
          variant="dark"
          type="submit"
          onClick={() => {
            setAction("Log In");
          }}
          style={{ marginRight: '10px' }} 
        >
          Login
        </Button>

        <Button
          className={action === "Sign Up" ? "gray" : "submit"}
          variant="dark"
          type="submit"
          onClick={() => {
            setAction("Sign Up");
          }}
        >
          Sign Up
        </Button>
      </Form>
    </Container>
    )
}