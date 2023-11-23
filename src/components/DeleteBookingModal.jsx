import { useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { deleteBooking } from "../features/posts/postsSlice";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export default function DeleteBookingModal({ show, handleClose, postId }) {
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;

  
  const handleDelete = () => {
     dispatch(deleteBooking({ userId, postId }));
      handleClose();
  }
  

  return (
    <Modal show={show} onHide={handleClose} size="md">
      <Modal.Header closeButton>
        <Modal.Title>Confirm Cancel</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to cancel this booking?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
