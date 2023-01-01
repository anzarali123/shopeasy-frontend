import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/config";

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCollection = () => {
      try {
        const docRef = collection(db, collectionName);
        const q = query(docRef, orderBy("createdAt", "desc"));

        onSnapshot(q, (snapshot) => {
          const allData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setData(allData);
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
      }
    };
    getCollection();
  }, [collectionName]);

  return { data, loading };
};

export default useFetchCollection;
