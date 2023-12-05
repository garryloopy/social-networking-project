import { db } from "../_utils/firebase";
import { collection, getDocs, getDoc, addDoc, doc, query, where } from "firebase/firestore";


export const getUserPostsByUserId = async (userId) => {
    try {
        const q = query(
            collection(db, "posts"),
            where("userId", "==", userId)
        );

        const querySnapshot = await getDocs(q);

        let posts = [];

        querySnapshot.forEach((doc) => {
            posts.push({
                docId: doc.id,
                data: doc.data(),
            });
        });

        return posts;
    } catch (error) {
        console.error("Error getting posts:", error);
        throw error;
    }
};




export const getUserDocIdByUserId = async (userId) => {
    const q = query(
        collection(db, "users"),
        where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        return docId;
    } else {
        // Handle the case where no user is found with the given userId
        return null;
    }
}

export const getUserByUserId = async (userId) => {
    const q = query(
        collection(db, "users"),
        where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        return data;
    } else {
        // Handle the case where no user is found with the given userId
        return null;
    }
}


export const getUserByDocId = async (docId) => {
    try {
        const docRef = doc(db, "users", docId);
        const docSnap = await getDoc(docRef);

        return docSnap.data();
    } catch (error) {
        console.log("Error fetching user", error);
    }
}

export const createPost = async (post) => {
    try {
        const docRef = await addDoc(collection(db, "posts"), {
            userDocId: post.userDocId,
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

export const createUser = async (user, contents) => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            userId: user.uid,
            photoURL: user.photoURL,
            displayName: contents.nameContents,
            bio: contents.bioContents,
        });

        return docRef.id;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}