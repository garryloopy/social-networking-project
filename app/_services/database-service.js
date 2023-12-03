import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export const createPost = async (post) => {
    try {
        const docRef = await addDoc(collection(db, "posts"), {
            userId: post.userId,
            photoURL: post.photoURL,
            displayName: post.displayName,
            timePosted: post.timePosted,
            contents: post.contents
        });

        return docRef.id;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

export const getAllPosts = async () => {
    try {
        const q = collection(db, "posts");
        const querySnapshot = await getDocs(q);

        let posts = [];

        querySnapshot.forEach(
            (doc) => { 
                posts.push(
                    {
                        docId: doc.id,
                        data: doc.data()
                    }
                )
            }
        );

        return posts;
    } catch (error) {
        console.error("Error getting posts:", error);
        throw error;
    }
}

export const getAllUsers = async () => {
    try {
        const q = collection(db, "users");
        const querySnapshot = await getDocs(q);

        let users = [];

        querySnapshot.forEach((doc) => {
            users.push({
                docId: doc.id,
                userInfo: doc.data()
            });
        });

        return users;
    } catch (error) {
        console.error("Error getting users:", error);
        throw error;
    }
};

export const createUser = async (user, bio) => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            userId: user.uid,
            photoURL: user.photoURL,
            displayName: user.displayName,
            bio: bio,
        });

        return docRef.id;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}