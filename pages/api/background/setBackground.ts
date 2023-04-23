import axios from "axios"

const FirebaseUrl = "https://zwit-cba2d-default-rtdb.europe-west1.firebasedatabase.app/"



export const updateBackgroundImageUrl = async (userId: string | undefined, url: string) => {
  if (!userId) throw new Error("User ID is undefined")

  try {
    const response = await axios.put(`${FirebaseUrl}/background/${userId}/url.json`, { data: url })
    return response.data
  } catch (error: any) {
    throw new Error(`Failed to update background image URL: ${error.message}`)
  }
};