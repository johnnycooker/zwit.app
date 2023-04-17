import React, { useState, useEffect } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import axios from "axios";

const FirebaseUrl = "https://zwit-cba2d-default-rtdb.europe-west1.firebasedatabase.app/";

interface Note {
  id: string;
  text: string;
}

const NoteEditor: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    axios.get(`${FirebaseUrl}/notes.json`).then((response) => {
      if (response.data) {
        const fetchedNotes = Object.keys(response.data).map((key) => {
          return {
            ...response.data[key],
            id: key,
          };
        });
        setNotes(fetchedNotes);
      }
    });
  }, []);

  const handleEditorChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  const handleBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const handleItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const handleUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const handleColorChange = (color: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, `COLOR-${color}`));
  };

  const handleSizeChange = (size: number) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, `SIZE-${size}`));
  };

  const handleGenerateClick = () => {
    const text = editorState.getCurrentContent().getPlainText();
    axios
      .post(`${FirebaseUrl}/notes.json`, { text })
      .then((response) => {
        const newNote = { id: response.data.name, text };
        setNotes([...notes, newNote]);
        setEditorState(EditorState.createEmpty());
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteClick = (id: string) => {
    axios
      .delete(`${FirebaseUrl}/notes/${id}.json`)
      .then(() => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
      })
      .catch((error) => console.log(error));
  };

  const renderNotes = () => {
    return notes.map((note) => {
      return (
        <div key={note.id}>
          <div>{note.text}</div>
          <button onClick={() => handleDeleteClick(note.id)}>Delete</button>
        </div>
      );
    });
  };

  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div>
      <Editor editorState={editorState} onChange={handleEditorChange} />
      <div>
        <button onClick={handleBoldClick} style={{ fontWeight: currentStyle.has("BOLD") ? "bold" : "normal" }}>
          B
        </button>
        <button onClick={handleItalicClick} style={{ fontStyle: currentStyle.has("ITALIC") ? "italic" : "normal" }}>
          I
        </button>
        <button onClick={handleUnderlineClick} style={{ textDecoration: currentStyle.has("UNDERLINE") ? "underline" : "none"}}>
U
</button>
<select onChange={(e) => handleColorChange(e.target.value)}>
<option value="">Color</option>
<option value="red">Red</option>
<option value="green">Green</option>
<option value="blue">Blue</option>
</select>
<select onChange={(e) => handleSizeChange(parseInt(e.target.value))}>
<option value="">Size</option>
{Array.from({ length: 10 }, (_, i) => i + 8).map((size) => (
<option key={size} value={size}>
{size}px
</option>
))}
</select>
<button onClick={handleGenerateClick}>Generate</button>
</div>
{renderNotes()}
</div>
);
};

export default NoteEditor;






