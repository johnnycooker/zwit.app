import axios from "axios"

const FirebaseUrl = "https://zwit-cba2d-default-rtdb.europe-west1.firebasedatabase.app/"

interface ObjectData {
  id: string
  data: string
}

interface CurrentUser {
  id: string
}

const handleAddObject = async (currentUser: CurrentUser | null, notesId: string | string[] | undefined, value: string, setObjects: React.Dispatch<React.SetStateAction<ObjectData[]>>) => {
  try {
    const newObject: ObjectData = {
      id: Date.now().toString(),
      data: value
    };

    const response = await axios.post(`${FirebaseUrl}/notes/${currentUser?.id}/${notesId}/objects.json`, newObject)
    const newObjectData: ObjectData = { id: response.data.name, data: newObject.data }
    setObjects((prevObjects) => [...prevObjects, newObjectData])
  } catch (error) {
    console.error(error)
  }
};

export default handleAddObject