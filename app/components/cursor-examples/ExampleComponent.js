// components/ExampleComponent.js

'use client'

import { useCursor } from '@/cursor/CursorContext';

function ExampleComponent() {
  const { setCursorText, setCursorVariant } = useCursor();

  return (
    <div>
      <div 
        className="someClass"
        onMouseEnter={() => { setCursorText("View"); setCursorVariant("project"); }}
        onMouseLeave={() => { setCursorText(""); setCursorVariant("default"); }}
      >
        Project Name
      </div>
      <div 
        className="contact"
        onMouseEnter={() => { setCursorText("👋"); setCursorVariant("contact"); }}
        onMouseLeave={() => { setCursorText(""); setCursorVariant("default"); }}
      >
        Want to Chat?
      </div>
    </div>
  );
}

export default ExampleComponent;
