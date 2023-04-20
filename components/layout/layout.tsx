import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar/navbar";
import { url } from "inspector";

const FirebaseUrl = "https://zwit-cba2d-default-rtdb.europe-west1.firebasedatabase.app/";

interface CurrentUser {
  id: string;
}


function Layout(props: any) {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("https://www.national-geographic.pl/media/cache/slider_big/uploads/media/default/0014/43/zorza-polarna_2.jpeg");
  
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await fetch('/api/current');
      const data = await response.json();
      setCurrentUser(data);
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    axios
      .get(`${FirebaseUrl}/background/${currentUser?.id}/url.json`)
      .then((response) => {
        if (response.data) {
          const url = response.data.data;
          setBackgroundImageUrl(url);
          if (url === 'ZABKA'){
            setBackgroundImageUrl("/images/tlo_menu.webp");
          }else if (url === 'RESET'){
            setBackgroundImageUrl("https://www.national-geographic.pl/media/cache/slider_big/uploads/media/default/0014/43/zorza-polarna_2.jpeg");
          }else if (url === '2137'){
            setBackgroundImageUrl("https://s1.tvp.pl/images2/1/4/0/uid_140acb647481ecf84f8c1c32a6d6539c1652854105962_width_1920_play_0_pos_0_gs_0_height_1080.jpg");
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching background image URL:", error);
      });
  }, [currentUser?.id]);

  const styles = {
    backgroundImage: `url(${backgroundImageUrl})`
  };

  return (
    <>
      <Navbar />
      <div style={styles} className="relative h-full w-full bg-no-repeat bg-fixed bg-cover">
        <div className="bg-black w-full h-full lg:bg-opacity-80">
          <main>{props.children}</main>
        </div>
      </div>
    </>
  );
}

export default Layout;