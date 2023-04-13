import Layout from "@/components/layout/layout"

import React, { useState, useEffect } from "react";
import axios from "axios";

import { NextPageContext } from "next"
import { getSession } from "next-auth/react"


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);


  if (!session) {
      return {
          redirect: {
              destination: '/auth',
              pernament: false,
          }
      }
  }


  return {
      props: {}
  }
}

const FirebaseUrl = "https://zwit-cba2d-default-rtdb.europe-west1.firebasedatabase.app/";

interface CurrentUser {
  id: string;
}

interface Post {
  id: string;
  title: string;
  body: string;
  header: string;
}


const Notes: React.FC = () => {
  
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const [admin, setAdmin] = useState(true);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [header, setHeader] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

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
      axios.get(`${FirebaseUrl}/notes/user/${currentUser?.id}/note.json`).then((response) => {
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
    }
  }, [currentUser?.id]);
  

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

    axios.post(`${FirebaseUrl}/notes/user/${currentUser?.id}/note.json`, newPost).then((response) => {
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
    axios.delete(`${FirebaseUrl}/notes/user/${currentUser?.id}/note/${id}.json`).then((response) => {
      setPosts((prevState) => prevState.filter((post) => post.id !== id));
    });
  };

  

  return (
    <>
      <Layout>
        <div className="flex justify-center">
          <div className="bg-green-900 bg-opacity-95 px-5 py-5 top-[14rem] absolute max-w-4xl  rounded-lg w-full flex justify-center gap-3 border-2 border-green-600">
            <div className="text-xl text-center"><div >
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
                  <h2 className="text-2xl">{post.header}</h2>
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
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
  
export default Notes