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

  if(currentUser?.id === '642c4a41d51211f0e2628654'){
    try {
      await axios.delete(`${FirebaseUrl}/incidents/test/${incidentId}/objects/${objectId}.json`)
      setObjects(prevObjects => prevObjects.filter(obj => obj.id !== objectId))
    } catch (error) {
      console.error(error)
    }
  }else{
    try {
      await axios.delete(`${FirebaseUrl}/incidents/${incidentId}/objects/${objectId}.json`)
      setObjects(prevObjects => prevObjects.filter(obj => obj.id !== objectId))
    } catch (error) {
      console.error(error)
    }
  }

  
};

export default handleDeleteObject