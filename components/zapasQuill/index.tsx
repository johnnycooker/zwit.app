import dynamic from 'next/dynamic';
import React, { useState } from "react";
import parse from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

export default function Home() {
  const [value, setValue] = useState('');
  const handleChange = (newValue:any) => {
    setValue(newValue);
  };
  return (
    <div>
      <QuillNoSSRWrapper
        modules={modules}
        placeholder='Compose here'
        value={value}
        onChange={handleChange}
        formats={formats}
        theme="snow"
      />

      <p>{value}</p>
      {parse(value)}
    </div>
  );
}