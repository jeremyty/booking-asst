import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AuthContext } from "./AuthProvider";
import { savePost } from "../features/posts/postsSlice";

export default function NewBookingModal({ show, handleClose }) {
  const [postContent, setPostContent] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;

  const handleSave = () => {
    dispatch(savePost({ userId, postContent }));
    handleClose();
    setPostContent("");
  };
  
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="postContent">
              <Form.Control 
                placeholder="May I help you?!"
                as="textarea"
                rows={3}
                onChange={(e) => setPostContent(e.target.value)}
              />
              <br/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            className="rounded-pill"
            onClick={handleSave}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )

}