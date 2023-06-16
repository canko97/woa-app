// CreatePostForm.tsx
import { Note } from '@/interfaces/Note';
import axios from 'axios';
import React, { useState } from 'react';

interface CreatePostFormProps {
  addNewNote: (newNote: Note) => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ addNewNote }) => {
  const [content, setContent] = useState('');

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_POSTS_SERVER_ENDPOINT}/api/notes/create`,
        { content: content },
        { withCredentials: true }
      );
      const newNote: Note = response.data;
      console.log('Creating post:', newNote);
      addNewNote(newNote); // Add the new note to the posts list
    } catch (e: any) {
      console.log('Error creating a note', e.message);
    }

    setContent(''); // Clear the form after submitting
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={handleContentChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
        >
          Make a note
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
