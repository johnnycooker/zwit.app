import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar/navbar";

const FirebaseUrl = "https://zwit-cba2d-default-rtdb.europe-west1.firebasedatabase.app/";

function Layout(props: any) {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("/images/tlo_menu.webp");
  

  useEffect(() => {
    axios
      .get(`${FirebaseUrl}/background/url.json`)
      .then((response) => {
        if (response.data) {
          const url = response.data.data;
          setBackgroundImageUrl(url);
          if (url === 'RESET'){
            setBackgroundImageUrl("/images/tlo_menu.webp");
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching background image URL:", error);
      });
  }, []);

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