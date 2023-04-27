import axios from 'axios'

const FirebaseUrl = "https://zwit-cba2d-default-rtdb.europe-west1.firebasedatabase.app/"

interface Link {
    id: string
    name: string
    url: string
  }
  
  interface CurrentUser {
    id: string
  }

const handleDeleteLink = async (id: string, currentUser: CurrentUser | null, links: Link[], setLinks: React.Dispatch<React.SetStateAction<Link[]>>) => {

  if(currentUser?.id === '642c4a41d51211f0e2628654'){
    try {
      await axios.delete(`${FirebaseUrl}/links/incidents/test/link/${id}.json`)
      setLinks(links.filter((link) => link.id !== id))
    } catch (error) {
      console.error(error)
    }
  }else{
    try {
      await axios.delete(`${FirebaseUrl}/links/incidents/link/${id}.json`)
      setLinks(links.filter((link) => link.id !== id))
    } catch (error) {
      console.error(error)
    }
  }
}

export default handleDeleteLink