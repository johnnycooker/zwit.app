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

  if(currentUser?.id === '642c4a41d51211f0e2628654'){
    try {
      const response = await axios.post(`${FirebaseUrl}/links/incidents/test/link.json`, { name, url: `/${name}` })
      const newLink: Link = { id: response.data.name, name, url: `/${name}` }
      setLinks((prevLinks) => [...prevLinks, newLink])
    } catch (error) {
      console.error(error)
    }
  }else{
    try {
      const response = await axios.post(`${FirebaseUrl}/links/incidents/link.json`, { name, url: `/${name}` })
      const newLink: Link = { id: response.data.name, name, url: `/${name}` }
      setLinks((prevLinks) => [...prevLinks, newLink])
    } catch (error) {
      console.error(error)
    }
  }


  
};

export default handleAddLink