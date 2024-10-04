'use client'
import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

export default function Editor({ placeholder }) {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: placeholder || 'Start typing...',
    height: 400 // set height for the editor
  }), [placeholder]);

  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', minHeight: '400px' }}>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={newContent => {}}
         // directly apply the height to the editor
      />
    </div>
  )
}
