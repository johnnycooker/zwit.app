import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

interface NoteGeneratorProps {
  generateNote: (text: string) => void;
}

const NoteGenerator: React.FC<NoteGeneratorProps> = ({ generateNote }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  const handleBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const handleItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const handleUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fontSize = e.target.value;
    setEditorState(RichUtils.toggleInlineStyle(editorState, `FONTSIZE-${fontSize}`));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setEditorState(RichUtils.toggleInlineStyle(editorState, `COLOR-${color}`));
  };

  const handleAddNoteClick = () => {
    const contentState = editorState.getCurrentContent();
    const plainText = contentState.getPlainText();
    generateNote(plainText);
    setEditorState(EditorState.createEmpty());
  };

  return (
    <div>
      <button onClick={handleBoldClick}>B</button>
      <button onClick={handleItalicClick}>I</button>
      <button onClick={handleUnderlineClick}>U</button>
      <input type="number" min="1" max="72" onChange={handleFontSizeChange} />
      <input type="color" onChange={handleColorChange} />
      <button onClick={handleAddNoteClick}>Add Note</button>
      <div className="editor-container">
        <Editor editorState={editorState} onChange={handleEditorChange} />
      </div>
    </div>
  );
};

export default NoteGenerator;