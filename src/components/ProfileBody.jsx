import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "./AuthProvider";
import { fetchPostsByUser } from "../features/posts/postsSlice";
import {  Col, Spinner } from "react-bootstrap";
import ProfilePostCard from "./ProfilePostCard";

export default function ProfileBody() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const loading = useSelector((state) => state.posts.loading);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        dispatch(fetchPostsByUser(currentUser.uid));
    }, [dispatch, currentUser]);

    return (
        <Col sm={6} className="bg-light container-lg align-items-center mt-3" style={{ border: "1px solid lightgrey"}}>
            {loading && (
                <Spinner animation="border" className="ms-3 mt-3" variant="primary" />
            )}
            {posts.length > 0 && posts.map((post) => (
                <ProfilePostCard key={post.id} post={post} />
            ))}
        </Col>

    )
}