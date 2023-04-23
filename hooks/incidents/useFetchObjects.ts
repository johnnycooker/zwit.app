import { useEffect } from "react";
import axios from "axios";

const FirebaseUrl = "https://zwit-cba2d-default-rtdb.europe-west1.firebasedatabase.app/";

interface ObjectData {
  id: string;
  data: any;
}

interface CurrentUser {
  id: string;
}

const useFetchObjects = (currentUser: CurrentUser | null, incidentId: string | string[] | undefined, setObjects: React.Dispatch<React.SetStateAction<ObjectData[]>>) => {
  useEffect(() => {
    const fetchObjects = async () => {
      if (currentUser?.id && incidentId) {
        try {
          const response = await axios.get<ObjectData[]>(`${FirebaseUrl}/incidents/${currentUser.id}/${incidentId}/objects.json`);
          if (response.data) {
            const fetchedObjects: ObjectData[] = [];
            for (const key in response.data) {
              fetchedObjects.push({
                id: key,
                data: response.data[key].data
              });
            }
            setObjects(fetchedObjects);
          }
        } catch (error) {
          console.error("Błąd przy pobieraniu danych", error);
        }
      }
    };
    fetchObjects();
  }, [currentUser?.id, incidentId, setObjects]);
};

export default useFetchObjects;