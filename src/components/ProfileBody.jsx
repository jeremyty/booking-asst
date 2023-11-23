import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "./AuthProvider";
import { fetchBookingsByUser } from "../features/posts/postsSlice";
import {  Col, Spinner } from "react-bootstrap";
import ProfilePostCard from "./ProfileCard";

export default function ProfileBody() {
    const dispatch = useDispatch();
    const bookings = useSelector((state) => state.posts.posts);
    const loading = useSelector((state) => state.posts.loading);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        dispatch(fetchBookingsByUser(currentUser.uid));
    }, [dispatch, currentUser]);

    return (
        <Col sm={6} className="bg-light container-lg align-items-center mt-3" style={{ border: "1px solid lightgrey"}}>
            {loading && (
                <Spinner animation="border" className="ms-3 mt-3" variant="primary" />
            )}
            {bookings.length > 0 && bookings.map((post) => (
                <ProfilePostCard key={post.id} post={post} />
            ))}
        </Col>

    )
}