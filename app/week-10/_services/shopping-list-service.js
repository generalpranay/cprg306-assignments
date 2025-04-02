import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

// Fetch all items for a specific user
export async function getItems(userId) {
    try {
        const items = [];
        const itemsRef = collection(db, `users/${userId}/items`);
        const querySnapshot = await getDocs(itemsRef);

        querySnapshot.forEach(doc => {
            items.push({ id: doc.id, ...doc.data() });
        });

        return items;
    } catch (error) {
        console.error("Error fetching user items:", error);
        return [];
    }
}

// Add a new item to the user's shopping list
export async function addItem(userId, item) {
    try {
        const itemsRef = collection(db, `users/${userId}/items`);
        const docRef = await addDoc(itemsRef, item);
        return docRef.id;
    } catch (error) {
        console.error("Error adding item:", error);
        return null;
    }
}
