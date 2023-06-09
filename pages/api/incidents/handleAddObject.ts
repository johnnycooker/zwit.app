import axios from "axios"

const FirebaseUrl = "https://zwit-cba2d-default-rtdb.europe-west1.firebasedatabase.app/"

interface ObjectData {
  id: string
  data: string
}

interface CurrentUser {
  id: string
}

const handleAddObject = async (currentUser: CurrentUser | null, incidentId: string | string[] | undefined, value: string, setObjects: React.Dispatch<React.SetStateAction<ObjectData[]>>) => {

  if(currentUser?.id === '642c4a41d51211f0e2628654'){
    try {
      const newObject: ObjectData = {
        id: Date.now().toString(),
        data: value
      };
  
      const response = await axios.post(`${FirebaseUrl}/incidents/test/${incidentId}/objects.json`, newObject)
      const newObjectData: ObjectData = { id: response.data.name, data: newObject.data }
      setObjects((prevObjects) => [...prevObjects, newObjectData])
    } catch (error) {
      console.error(error)
    }
  } else {
    try {
      const newObject: ObjectData = {
        id: Date.now().toString(),
        data: value
      };
  
      const response = await axios.post(`${FirebaseUrl}/incidents/${incidentId}/objects.json`, newObject)
      const newObjectData: ObjectData = { id: response.data.name, data: newObject.data }
      setObjects((prevObjects) => [...prevObjects, newObjectData])
    } catch (error) {
      console.error(error)
    }
  } 
  
};

export default handleAddObject