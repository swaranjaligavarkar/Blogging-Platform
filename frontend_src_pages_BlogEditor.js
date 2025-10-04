import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

function BlogEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/blogs', { title, content }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    // Redirect or show success
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <ReactQuill value={content} onChange={setContent} />
      <button type="submit">Publish</button>
    </form>
  );
}

export default BlogEditor;