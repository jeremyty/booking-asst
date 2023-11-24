import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import UpdateBookingModal from "./UpdateBookingModal";
import DeleteBookingModal from "./DeleteBookingModal";

export default function ProfileCard ({ post }) {
    const { date, time, phone, description, pack, duration, id: postId } = post;
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleShowDeleteModal = () => setShowDeleteModal(true);
    const handleShowUpdateModal = () => setShowUpdateModal(true);

    const handleClose = () => {
        setShowUpdateModal(false);
        setShowDeleteModal(false);
    }


    return (
        <Row
        className="p-3"
        style={{
            borderTop: "1px solid #D3D3D3",
            borderBottom: "1px solid #D3D3D3"
        }}
        >
            <Col>
            
            <p><strong> Description : {description}</strong></p>
            <span>Date : {date}</span><br/>
            <span>Phone No : {phone} </span><br />
           <span>Time : {time} </span><br/>
           <span>Duration : {duration} </span> <br/>
           <span>{pack} people </span>
           
            <div className="d-flex justify-content-between">
                <Button variant="light">
                <i
                    className="bi bi-pencil-square"
                    onClick={handleShowUpdateModal}
                    ></i>
                </Button>
                <Button variant="light me-auto">
                <i className="bi bi-trash"
                    onClick={handleShowDeleteModal}></i>
                </Button>
                <UpdateBookingModal
                show={showUpdateModal}
                handleClose={handleClose}
                postId={postId}
                originalBookingDescription={description}
                originalBookingDate={date}
                originalBookingTime={time}
                originalBookingPhone={phone}
                originalBookingPack={pack}
                originalBookingDuration={duration}

                />
                <DeleteBookingModal
                show={showDeleteModal}
                handleClose={handleClose}
                postId={postId}
                />
            </div>
            <Form>
            
            </Form>
            </Col>
        </Row>
    )
}