import Layout from "@/components/layout/layout"

import React, { useState, useEffect } from "react";
import axios from "axios";

import InsetLink from "./insetLink";


const FirebaseUrl = "https://zwit-cba2d-default-rtdb.europe-west1.firebasedatabase.app/";

interface InsetProps {
    pageName: string
}

interface Post {
  id: string;
  title: string;
  body: string;
  header: string;
}


const Inset: React.FC<InsetProps> = ({pageName}) => {

  const [admin] = useState(false);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [header, setHeader] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get(`${FirebaseUrl}/insets/${pageName}.json`).then((response) => {
      if (response.data) {
        const fetchedPosts = Object.keys(response.data).map((key) => {
          return {
            ...response.data[key],
            id: key,
          };
        });
        setPosts(fetchedPosts);
      }
    });
  }, []);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  const handleHeaderChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHeader(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newPost = {
      title: title,
      body: body,
      header: header
    };

    axios.post(`${FirebaseUrl}/insets/${pageName}.json`, newPost).then((response) => {
      setPosts((prevState) => [
        ...prevState,
        { ...newPost, id: response.data.name },
      ]);
      setTitle("");
      setBody("");
      setHeader("");
    });
  };

  const handleDelete = (id: string) => {
    axios.delete(`${FirebaseUrl}/insets/${pageName}/${id}.json`).then((response) => {
      setPosts((prevState) => prevState.filter((post) => post.id !== id));
    });
  };

  return (
    <>
        <Layout>
            <img src='/images/black_fade.webp' alt='Logo' className="w-full h-[18rem] absolute top-[42rem] opacity-90"/>
            <div className="flex-wrap justify-center top-[8rem] absolute left-[2rem] w-11/12 ">
                <div className="flex flex-row gap-28 w-full ">

                    <div className="bg-zinc-900 bg-opacity-90 px-5 py-5 w-full  max-w-[15rem] h-[30rem]  rounded-lg  border-2 border-green-600 border-opacity-20">
                        <div className="text-xl text-left">
                            <p className="pb-4 font-bold text-green-700">WKLEJKI POS</p>
                            <ul>
                                <InsetLink url="drukarkafiskalna" label="Drukarka Fiskalna"/>
                                <InsetLink url="komputerkasowy" label="Komputer Kasowy"/>
                                <InsetLink url="lotto" label="Lotto"/>
                                <InsetLink url="monitorkasowy" label="Monitor Kasowy"/>
                                <InsetLink url="ladowy" label="Skaner Ladowy"/>
                                <InsetLink url="skaner" label="Skaner Ręczny"/>
                                <InsetLink url="szuflada" label="Szuflada Kasowa"/>
                                <InsetLink url="tabletsamsung" label="Tablet Samsung"/>
                                <InsetLink url="ups" label="UPS"/>
                                <InsetLink url="waga" label="Waga Ladowa"/>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-zinc-900 bg-opacity-90 px-5 py-5 mb-4 h-full w-full max-w-10/12 rounded-lg text-center border-2 border-green-600 border-opacity-20">
                        <div>
                            {admin &&
                                <form onSubmit={handleSubmit} className="flex flex-col gap-2 pb-2">
                                    <div className="px-4 py-4">
                                    <label htmlFor="header">Header:</label>
                                    <textarea
                                    className="px-4  mx-2"
                                    id="header"
                                    value={header}
                                    onChange={handleHeaderChange}
                                    />
                                    </div>
                                    <div className="px-4 py-4">
                                    <label htmlFor="title">Title:</label>
                                    <input
                                    className="px-4  mx-2"
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={handleTitleChange}
                                    />
                                    </div>
                                    <div>
                                        <label htmlFor="body" className="justify-center text-center px-4">Body:</label>
                                        <textarea id="body" value={body} onChange={handleBodyChange} className=""/>
                                    </div>
                                    <button className="px-4 font-bold text-white bg-green-700 rounded-md hover:bg-green-500 mt-4" type="submit">Add post</button>
                                </form>
                            }
                            <ul>
                            {posts.map((post) => (
                                <li key={post.id}>
                                <h2 className="text-4xl text-center py-2 text-green-700 font-extrabold">{post.header}</h2>
                                <h3 className="text-left px-4 text-lg font-bold text-green-700">{post.title}</h3>
                                <p className="text-sm text-left px-4 text-gray-300">{post.body}</p>
                                {admin && <button className="px-4 font-bold text-white bg-green-700 rounded-md hover:bg-green-500 mt-4" onClick={() => handleDelete(post.id)}>Delete</button>}
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    </>
)

}
  
export default Inset