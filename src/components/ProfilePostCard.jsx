import { useContext, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AuthContext } from "./AuthProvider";
import { deletePost } from "../features/posts/postsSlice";
import UpdatePostModal from "./UpdatePostModal";

export default function ProfilePostCard ({ post }) {
    const { content, id: postId } = post;
    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser.uid;

    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const handleShowUpdateModal = () => setShowUpdateModal(true);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);


    const handleDelete = () => {
        dispatch(deletePost({ userId, postId }));
    };

    return (
        <Row
        className="p-3"
        style={{
            borderTop: "1px solid #D3D3D3",
            borderBottom: "1px solid #D3D3D3"
        }}
        >
        

            <Col>
            <strong>Haris</strong>
            <span>@haris.samingan · Apr 16</span>
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
                <Button variant="light" onClick={handleDelete}>
                    <i className="bi bi-trash"></i>
                </Button>
                <UpdatePostModal
                show={showUpdateModal}
                handleClose={handleCloseUpdateModal}
                postId={postId}
                originalPostContent={content}
                />
            </div>
            </Col>
        </Row>
    )
}