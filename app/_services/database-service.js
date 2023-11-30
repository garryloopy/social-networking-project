import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export const getAllUsers = async () => {
    try {
        const q = collection(db, "users");
        const querySnapshot = await getDocs(q);

        let users = [];

        querySnapshot.forEach((doc) => { console.log(doc.id) });
        querySnapshot.forEach((doc) => {
            users.push({
                userId: doc.id,
            });
        });

        return users;
    } catch (error) {
        console.error("Error getting users:", error);
        throw error;
    }
};

export const createUser = async (userId) => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            bio: "",
        });

        return docRef.id;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}