import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../layout/layout";
import BackgroundInput from "./backgroundInput";

const FirebaseUrl = "https://zwit-cba2d-default-rtdb.europe-west1.firebasedatabase.app/";

interface CurrentUser {
  id: string;
}

const Background = () => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await fetch('/api/current');
      const data = await response.json();
      setCurrentUser(data);
    };
    fetchCurrentUser();
  }, []);

  const handleBackgroundImageChange = (event:any) => {
    setBackgroundImageUrl(event.target.value);
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();

    
    axios.put(`${FirebaseUrl}/background/${currentUser?.id}/url.json`, { data: backgroundImageUrl })
      .then(response => {
        console.log("Background image URL updated successfully!");
        window.location.reload();
      })
      .catch(error => {
        console.error("Error updating background image URL:", error);
      });
  };

  return (
    <>
      <Layout>
        <div className="flex justify-center">
            <div className="bg-neutral-600 bg-opacity-20 px-5 py-5 top-[6rem] absolute lg:2/5  rounded-lg min-w-[45rem] w-fit flex justify-center border-2 border-green-600 border-opacity-20">
              <div>
                <form onSubmit={handleSubmit}>
                  <div>
                    <div>
                      <BackgroundInput type="text" value={backgroundImageUrl} onChange={handleBackgroundImageChange} label="Wprowadź adres URL"/>
                    </div>
                    <div>
                      <button className="bg-green-800 py-1 text-zinc-300 text-lg rounded-md w-full text-center mt-2 hover:bg-green-600 cursor-pointer border-black border-opacity-30 border-[0.05rem]" type="submit">Zmień tło</button>
                    </div>
                  </div>  
                </form>
                <div className="text-white">
                  <p className="text-center pt-8 pb-4">Wpisz podane hasła aby zmienić tło lub wpisz własny adres URL:</p>
                  <p>RESET - zmiana tła na podstawowe</p>
                  <p>ZABKA - zmiana tła na żabkowe</p>
                </div>
              </div>
            </div>
            
        </div>
      </Layout>
    </>
  );
};

export default Background;