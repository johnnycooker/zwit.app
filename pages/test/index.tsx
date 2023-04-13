import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const FirebaseUrl = "https://zwit-cba2d-default-rtdb.europe-west1.firebasedatabase.app/";

interface Link {
  id: string;
  name: string;
  url: string;
}

const Index = () => {
  const [name, setName] = useState("");
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    axios.get(`${FirebaseUrl}/links.json`).then((response) => {
      if (response.data) {
        const fetchedLinks = Object.keys(response.data).map((key) => {
          return {
            ...response.data[key],
            id: key,
          };
        });
        setLinks(fetchedLinks);
      }
    });
  }, []);

  const handleAddLink = () => {
    axios.post(`${FirebaseUrl}/links.json`, { name, url: `http://localhost:3000/test/${name}` }).then((response) => {
      setLinks([...links, { id: response.data.name, name, url: `http://localhost:3000/test/${name}` }]);
      setName("");
    });
  };

  const handleDeleteLink = (id: string) => {
    axios.delete(`${FirebaseUrl}/links/${id}.json`).then(() => {
      setLinks(links.filter((link) => link.id !== id));
    });
  };

  const handleEditLink = (id: string, name: string) => {
    const newName = prompt("Enter new name", name);
    if (newName) {
      axios.patch(`${FirebaseUrl}/links/${id}.json`, { name: newName }).then(() => {
        setLinks(links.map((link) => (link.id === id ? { ...link, name: newName } : link)));
      });
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "50px" }}>
          <input
            type="text"
            placeholder="Enter link name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <button onClick={handleAddLink}>Add Link</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {links.map((link) => (
            <div key={link.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <Link href={link.url}>{link.name}</Link>
              <button onClick={() => handleEditLink(link.id, link.name)}>Edit</button>
              <button onClick={() => handleDeleteLink(link.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;