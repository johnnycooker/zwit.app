import React, { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import { fetchBackgroundImageUrl } from "@/pages/api/getBackground"; 

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
    if (currentUser?.id) {
      fetchBackgroundImageUrl(currentUser.id).then((url) => {
        setBackgroundImageUrl(url);
      });
    }
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