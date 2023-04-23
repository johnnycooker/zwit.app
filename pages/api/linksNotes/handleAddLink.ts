import axios from "axios"

const FirebaseUrl = "https://zwit-cba2d-default-rtdb.europe-west1.firebasedatabase.app/"

interface Link {
  id: string
  name: string
  url: string
}

interface CurrentUser {
  id: string
}

const handleAddLink = async (currentUser: CurrentUser | null, name: string, setLinks: React.Dispatch<React.SetStateAction<Link[]>>) => {
  try {
    const response = await axios.post(`${FirebaseUrl}/links/${currentUser?.id}/link.json`, { name, url: `/${name}` })
    const newLink: Link = { id: response.data.name, name, url: `/${name}` }
    setLinks((prevLinks) => [...prevLinks, newLink])
  } catch (error) {
    console.error(error)
  }
};

export default handleAddLink