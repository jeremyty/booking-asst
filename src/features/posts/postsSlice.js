import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

// Async thunk to delete a post
export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async ({ userId, postId }) => {
        try {
            // ref to post
            const postRef = doc(db, `users/${userId}/posts/${postId}`);
            // delete post
            await deleteDoc(postRef);
            return postId;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
)
//Async thunk is to update a post
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ userId, postId, newPostContent }) => {
    try {
      // Upload the new file to the storage if it exists and get its URL
      

      // Reference to an existing post
      const postRef = doc(db, `users/${userId}/posts/${postId}`);
      // Get the current post data
      const postSnap = await getDoc(postRef);

      if (postSnap.exists()) {
        const postData = postSnap.data();
        // Update the post content and the image URL
        const updatedData = {
          ...postData,
          content: newPostContent || postData.content,
        };
        // Update the existing document in Firestore
        await updateDoc(postRef, updatedData);

        // Return the post with updated data
        const updatedPost = { id: postId, ...updatedData };
        return updatedPost;
      } else {
        throw new Error("Post does not exist");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Async thunk for fetching a user's posts
export const fetchPostsByUser = createAsyncThunk(
  "posts/fetchPostsByUser", // name
  async (userId) => {
    try {
      // get from firestore
      const postsRef = collection(db, `users/${userId}/posts`); //db = database from firestore

      const querySnapshot = await getDocs(postsRef);
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(docs);
      return docs; //output 'docs' to action.payload
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Async thunk to create a post
export const savePost = createAsyncThunk(
  "posts/savePost",
  async ({ userId, postContent }) => {
    try {

      

      const postsRef = collection(db, `users/${userId}/posts`);
      // The doc() function creates a reference (newPostRef) for a new document within the postsRef collection
      const newPostRef = doc(postsRef);

      await setDoc(newPostRef, { content: postContent });
      const newPost = await getDoc(newPostRef);

      const post = {
        id: newPost.id,
        ...newPost.data(),
      };

      return post;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);



// Slice
const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [], loading: true },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(savePost.fulfilled, (state, action) => {
        state.posts = [action.payload, ...state.posts];
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        // Find and update the post in the state
        const postIndex = state.posts.findIndex(
          (post) => post.id === updatedPost.id
        );

        if (postIndex !== -1) {
          state.posts[postIndex] = updatedPost;
        }
      })
      .addCase (deletePost.fulfilled, (state, action) => {
        const deletePostId = action.payload;
        state.posts = state.posts.filter((post) => post.id !== deletePostId);
      });
  },
});

export default postsSlice.reducer;