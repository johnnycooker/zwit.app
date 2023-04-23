import axios from "axios"

const FirebaseUrl = "https://zwit-cba2d-default-rtdb.europe-west1.firebasedatabase.app/"

interface BackgroundData {
  data: string;
}

export const fetchBackgroundImageUrl = async (userId: string) => {
  try {
    const response = await axios.get<BackgroundData>(`${FirebaseUrl}/background/${userId}/url.json`)
    const url = response.data.data
    if (url === 'ZABKA'){
      return "/images/tlo_menu.webp"
    }else if (url === 'RESET'){
      return "https://www.national-geographic.pl/media/cache/slider_big/uploads/media/default/0014/43/zorza-polarna_2.jpeg"
    }else if (url === '2137'){
      return "https://s1.tvp.pl/images2/1/4/0/uid_140acb647481ecf84f8c1c32a6d6539c1652854105962_width_1920_play_0_pos_0_gs_0_height_1080.jpg"
    } else {
      return url
    }
  } catch (error) {
    console.error("Błąd przy pobieraniu danych tła:", error)
    return "https://www.national-geographic.pl/media/cache/slider_big/uploads/media/default/0014/43/zorza-polarna_2.jpeg"
  }
}