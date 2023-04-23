import { useEffect } from "react";
import axios from "axios";

const FirebaseUrl = "https://zwit-cba2d-default-rtdb.europe-west1.firebasedatabase.app/";

interface Link {
  id: string;
  name: string;
  url: string;
}

interface CurrentUser {
  id: string;
}

const useFetchLinks = (currentUser: CurrentUser | null, setLinks: React.Dispatch<React.SetStateAction<Link[]>>) => {
  useEffect(() => {
    const fetchLinks = async () => {
      if (currentUser?.id) {
        try {
          const response = await axios.get(`${FirebaseUrl}/links/${currentUser.id}/link.json`);
          if (response.data) {
            const fetchedLinks = Object.keys(response.data).map((key) => {
              return {
                ...response.data[key],
                id: key,
              };
            });
            setLinks(fetchedLinks);
          }
        } catch (error) {
          console.error("Błąd przy pobieraniu danych", error);
        }
      }
    };
    fetchLinks();
  }, [currentUser?.id, setLinks]);
};

export default useFetchLinks;