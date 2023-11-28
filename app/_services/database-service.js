import { db } from "../_utils/firebase";

import { 
    collection, 
    getDocs, 
    addDoc, 
    query, 
    doc ,
    deleteDoc
} from "firebase/firestore"; 

export const getAllUsers = async () => {
    const q = query(
        collection(db, "users")
    );

    const querySnapshot = await getDocs(q);

    let users = [];
    querySnapshot.forEach(
        (doc) => {
            users.push( 
                {
                    userId: doc.id,
                }
            )
        }
    )

    return users;
}

export const addUser = async (userId) => {
    const docRef = await addDoc(
        collection(db, "users"), {
            userId: userId
        }
    )

    return docRef.id;
}