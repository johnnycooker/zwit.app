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
  try {
    await axios.delete(`${FirebaseUrl}/links/incidents/${currentUser?.id}/link/${id}.json`)
    setLinks(links.filter((link) => link.id !== id))
  } catch (error) {
    console.error(error)
  }
}

export default handleDeleteLink