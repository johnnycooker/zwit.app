import axios from "axios"

const FirebaseUrl = "https://zwit-cba2d-default-rtdb.europe-west1.firebasedatabase.app/"

interface ObjectData {
  id: string
  data: string
}

interface CurrentUser {
  id: string
}

const handleDeleteObject = async (currentUser: CurrentUser | null, incidentId: string | string[] | undefined, objectId: string, setObjects: React.Dispatch<React.SetStateAction<ObjectData[]>>) => {
  try {
    await axios.delete(`${FirebaseUrl}/incidents/${currentUser?.id}/${incidentId}/objects/${objectId}.json`)
    setObjects(prevObjects => prevObjects.filter(obj => obj.id !== objectId))
  } catch (error) {
    console.error(error)
  }
};

export default handleDeleteObject