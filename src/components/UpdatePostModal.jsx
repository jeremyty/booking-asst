import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updatePost } from "../features/posts/postsSlice";
import { AuthContext } from "./AuthProvider";

export default function UpdatePostModal({ show, handleClose, postId, originalPostContent }) {
  const [newPostContent, setNewPostContent] = useState(originalPostContent);
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;

  const handleUpdate = () => {
    dispatch(updatePost({ userId, newPostContent, postId }));
    handleClose();
    setNewPostContent(newPostContent);
  };

  

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="postContent">
              <Form.Control 
                defaultValue={originalPostContent}
                as="textarea"
                rows={3}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
              <br/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="rounded-pill"
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )

}