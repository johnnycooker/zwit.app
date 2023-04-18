import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const FirebaseUrl = "https://zwit-cba2d-default-rtdb.europe-west1.firebasedatabase.app/";

interface ObjectData {
  id: string;
  data: string;
}

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: { matchVisual: false },
};

const formats = [
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'indent',
  'link',
  'image',
  'video',
];

export default function Home() {
  const [value, setValue] = useState('');
  const [objects, setObjects] = useState<ObjectData[]>([]);

  useEffect(() => {
    axios.get<ObjectData[]>(`${FirebaseUrl}/objects.json`)
      .then(response => {
        if (response.data) {
          const fetchedObjects: ObjectData[] = [];
          for (const key in response.data) {
            fetchedObjects.push({
              id: key,
              data: response.data[key].data
            });
          }
          setObjects(fetchedObjects);
        }
      })
      .catch(error => console.error(error));
  }, []);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleGenerateClick = () => {
    const newObject: ObjectData = {
      id: Date.now().toString(),
      data: value
    };

    axios.post(`${FirebaseUrl}/objects.json`, newObject)
      .then(response => {
        setObjects(prevObjects => [...prevObjects, {
          id: response.data.name,
          data: newObject.data
        }]);
      })
      .catch(error => console.error(error));
    setValue('');
  };

  const handleDeleteClick = (objectId: string) => {
    axios.delete(`${FirebaseUrl}/objects/${objectId}.json`)
      .then(() => {
        setObjects(prevObjects => prevObjects.filter(obj => obj.id !== objectId));
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <style>{`
        .ql-size-small {
            font-size: 10px;
        }
        .ql-size-large {
            font-size: 20px;
        }
        .ql-size-huge {
            font-size: 36px;
        }
        
      `}</style>
      <QuillNoSSRWrapper
        modules={modules}
        placeholder='Compose here'
        value={value}
        onChange={handleChange}
        formats={formats}
        theme="snow"
      />
      <button onClick={handleGenerateClick}>Generate</button>
      <ul>
        {objects.map(obj => (
          <li key={obj.id}>
            <div>{parse(obj.data)}</div>
            <button onClick={() => handleDeleteClick(obj.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

