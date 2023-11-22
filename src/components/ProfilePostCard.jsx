import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import UpdatePostModal from "./UpdatePostModal";
import DeleteBookingModal from "./DeleteBookingModal";

export default function ProfilePostCard ({ post }) {
    const { content, id: postId } = post;
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
            <strong>User</strong>
            <span>@hahaha · Aug 16</span>
            <p>{content}</p>
            <div className="d-flex justify-content-between">
                <Button variant="light">
                    <i className="bi bi-chat"></i>
                </Button>
                <Button variant="light">
                    <i className="bi bi-repeat"></i>
                </Button>
                <Button variant="light">
                    <i className="bi bi-graph-up"></i>
                </Button>
                <Button variant="light">
                    <i className="bi bi-upload"></i>
                </Button>
                <Button variant="light"> 
                    <i
                    className="bi bi-pencil-square"
                    onClick={handleShowUpdateModal}
                    ></i>
                </Button>
                <Button variant="light" >
                    <i className="bi bi-trash"
                    onClick={handleShowDeleteModal}></i>
                </Button>
                <UpdatePostModal
                show={showUpdateModal}
                handleClose={handleClose}
                postId={postId}
                originalPostContent={content}
                />
                <DeleteBookingModal
                show={showDeleteModal}
                handleClose={handleClose}
                
                />
            </div>
            </Col>
        </Row>
    )
}