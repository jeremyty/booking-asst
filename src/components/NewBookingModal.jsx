import { useContext, useState } from "react";
import { Button, Form, FormSelect, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AuthContext } from "./AuthProvider";
import { saveBooking } from "../features/posts/postsSlice";

export default function NewBookingModal({ show, handleClose }) {
  const [bookingDate, setBookingDate] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;
  const [bookingDescription, setBookingDescription] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingPack, setBookingPack] = useState("");
  const [bookingDuration, setBookingDuration] = useState("");
  const [bookingTime, setBookingTime] = useState("");


  const handleSave = () => {
    dispatch(saveBooking({ userId, bookingDescription, bookingPhone, bookingPack, bookingDuration, bookingTime, bookingDate  }));
    handleClose();
    setBookingDescription("");
    setBookingPhone("");
    setBookingDate("");
    setBookingTime("");
    setBookingPack("");
    setBookingDuration("");

  };
  
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
            <div className="col-md-6">
            <Form.Group controlId="postDuration">
            <label name="reservation_phone">Duration</label>

              <Form.Control 
                placeholder="How long for the booking?"
                as="textarea"
                rows={2}
                onChange={(e) => setBookingDuration(e.target.value)}
              />
              <br/>
            </Form.Group>
            </div>
            <div className="col-md-6">
            <Form.Group controlId="postPack">
            <label name="reservation_phone">Packs</label>

              <Form.Control 
                placeholder="How many packs"
                as="textarea"
                rows={2}
                onChange={(e) => setBookingPack(e.target.value)}
              />
              <br/>
            </Form.Group>
            </div>
          <div className="col-md-6">
            <Form.Group controlId="postPhone">
            <label name="reservation_phone">Phone</label>

              <Form.Control 
                placeholder="Phone Number"
                as="textarea"
                rows={3}
                onChange={(e) => setBookingPhone(e.target.value)}
              />
              <br/>
            </Form.Group>
            </div>
            <div className="col-md-6">
            <Form.Group controlId="postDescription">
            <label name="reservation_description">Description</label>

              <Form.Control 
                placeholder="Description?!"
                as="textarea"
                rows={3}
                onChange={(e) => setBookingDescription(e.target.value)}
              />
              <br/>
            </Form.Group>
            </div>
            <div className="col-md-6">
            <Form.Group controlId="postDate">
            <label name="reservation_date">Date</label>

            <Form.Control
              type="date"
              name="reservation_date"
              placeholder="Date"
              onChange={(e) => setBookingDate(e.target.value)}

              required
            />
              <br/>
            </Form.Group>
            </div>

            <div className="col-md-6">
            <label name="reservation_time">Time</label>
            <FormSelect
              name="reservation_time"
              
              onChange={(e) => setBookingTime(e.target.value)}

              required
            >
              <option value="10:00am">10:00am</option>
              <option value="10:45am">10:45am</option>
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
        </div>

            
            </Row>

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