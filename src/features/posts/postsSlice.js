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

export const deleteBooking = createAsyncThunk(
    "posts/deleteBooking",
    async ({ userId, postId }) => {
        try {
            const bookingRef = doc(db, `users/${userId}/posts/${postId}`);
            await deleteDoc(bookingRef);
            return postId;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
)
export const saveBooking = createAsyncThunk(
  "posts/savePost",
  async ({ userId, bookingDate, bookingDescription, bookingPhone, bookingTime, bookingDuration, bookingPack }) => {
    try {
      const postsRef = collection(db, `users/${userId}/posts`);
      const newPostRef = doc(postsRef);

      await setDoc(newPostRef, {
        date: bookingDate,
        description: bookingDescription,
        phone: bookingPhone,
        time: bookingTime,
        pack: bookingPack,
        duration: bookingDuration,


      });
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

export const updateBooking = createAsyncThunk(
  "posts/updatePost",
  async ({ userId, postId, newBookingDescription, newBookingDate, newBookingTime, newBookingPhone, newBookingPack, newBookingDuration }) => {
    try {
      const bookingRef = doc(db, `users/${userId}/posts/${postId}`);
      const bookingSnap = await getDoc(bookingRef);

      if (bookingSnap.exists()) {
        const bookingData = bookingSnap.data();
        const updatedData = {
          ...bookingData,
          description: newBookingDescription || bookingData.description,
          date: newBookingDate || bookingData.date,
          time: newBookingTime || bookingData.time,
          phone: newBookingPhone || bookingData.phone,
          pack: newBookingPack|| bookingData.pack,
          duration: newBookingDuration || bookingData.duration,


        };
        await updateDoc(bookingRef, updatedData);

        const updatedBooking = { id: postId, ...updatedData };
        return updatedBooking;
      } else {
        throw new Error("Post does not exist");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const fetchBookingsByUser = createAsyncThunk(
  "posts/fetchBookingsByUser", 
  async (userId) => {
    try {
      const postsRef = collection(db, `users/${userId}/posts`); 
      const querySnapshot = await getDocs(postsRef);
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(docs);
      return docs; 
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);




const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [], loading: true },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingsByUser.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(saveBooking.fulfilled, (state, action) => {
        state.posts = [action.payload, ...state.posts];
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        const updatedBooking = action.payload;
        const postIndex = state.posts.findIndex(
          (post) => post.id === updatedBooking.id
        );

        if (postIndex !== -1) {
          state.posts[postIndex] = updatedBooking;
        }
      })
      .addCase (deleteBooking.fulfilled, (state, action) => {
        const deleteBookingId = action.payload;
        state.posts = state.posts.filter((post) => post.id !== deleteBookingId);
      });
  },
});

export default postsSlice.reducer;