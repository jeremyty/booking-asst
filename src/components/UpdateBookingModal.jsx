import { useContext, useState } from "react";
import { Button, Form, FormSelect, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateBooking } from "../features/posts/postsSlice";
import { AuthContext } from "./AuthProvider";

export default function UpdateBookingModal({ show, handleClose, postId, originalBookingDescription, originalBookingDate, originalBookingTime, originalBookingPhone, originalBookingDuration, originalBookingPack }) {
  const [newBookingDescription, setNewBookingDescription] = useState(originalBookingDescription);
  const [newBookingDate, setNewBookingDate] = useState(originalBookingDate);
  const [newBookingTime, setNewBookingTime] = useState(originalBookingTime);
  const [newBookingPhone, setNewBookingPhone] = useState(originalBookingPhone);
  const [newBookingDuration, setNewBookingDuration] = useState(originalBookingDuration);
  const [newBookingPack, setNewBookingPack] = useState(originalBookingPack);

  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;

  const handleUpdate = () => {
    dispatch(updateBooking({ userId, postId, newBookingDescription, newBookingDate, newBookingTime, newBookingPhone, newBookingDuration, newBookingPack }));
    handleClose();
    setNewBookingDescription(newBookingDescription);
    setNewBookingDate(newBookingDate);
    setNewBookingTime(newBookingTime);
    setNewBookingPhone(newBookingPhone);
    setNewBookingDuration(newBookingDuration);
    setNewBookingPack(newBookingPack);
  };


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <div className="col-md-6">
                <Form.Group controlId="bookingDescription">
                  <Form.Control 
                    defaultValue={originalBookingDescription}
                    as="textarea"
                    placeholder="New description"
                    rows={2}
                    onChange={(e) => setNewBookingDescription(e.target.value)}
                  />
                  <br/>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group controlId="bookingDate">
                  <Form.Control 
                    defaultValue={originalBookingDate}
                    type="date"
                    onChange={(e) => setNewBookingDate(e.target.value)}
                  />
                  <br/>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group controlId="bookingPhone">
                  <Form.Control 
                    defaultValue={originalBookingPhone}
                    as="textarea"
                    placeholder="Phone Number"
                    rows={2}
                    onChange={(e) => setNewBookingPhone(e.target.value)}
                  />
                  <br/>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group controlId="bookingTime">
                  <FormSelect
                    name="reservation_time"
                    onChange={(e) => setNewBookingTime(e.target.value)}
                    required
                  >
                    <option value="11:00am">11:00am</option>
                    <option value="11:30am">11:30am</option>
                      <option value="12:15pm">12:15pm</option>
                      <option value="1:15pm">1:15pm</option>
                      <option value="2:15pm">2:15pm</option>
                      <option value="3:15pm">3:15pm</option>
                      <option value="4:15pm">4:15pm</option>
                      <option value="5:15pm">5:15pm</option>
                      <option value="6:15pm">6:15pm</option>
                      <option value="7:15pm">7:15pm</option>
                      <option value="8:00pm">8:00pm</option>
                      <option value="8:45pm">8:45pm</option>
                    <option value="9:30pm">9:30pm</option>
                  </FormSelect>
                  <br/>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group controlId="bookingDuration">
                  <label name="reservation_phone">Duration</label>
                  <Form.Control 
                    placeholder="How long for the booking?"
                    as="textarea"
                    defaultValue={originalBookingDuration}
                    rows={2}
                    onChange={(e) => setNewBookingDuration(e.target.value)}
                  />
                  <br/>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group controlId="bookingPack">
                  <label name="reservation_phone">Number of attendees</label>
                  <Form.Control 
                    placeholder="How many people"
                    as="textarea"
                    defaultValue={originalBookingPack}
                    rows={2}
                    onChange={(e) => setNewBookingPack(e.target.value)}
                  />
                  <br/>
                </Form.Group>
              </div>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
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
