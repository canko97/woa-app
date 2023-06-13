// PostFeed.tsx
import React, { useState, useEffect } from 'react';
import Post from './Post';
import CreatePostForm from './CreatePostForm';
import axios from 'axios';
import { Note } from '@/interfaces/Note';

const PostFeed: React.FC = () => {
  const [notes, setNotes] = useState<Note[] | null>(null);

  useEffect(() => {
    getNotes();
  }, []);

  async function getNotes() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/notes/get`,
        {
          withCredentials: true,
        }
      );
      const fetchedNotes: Note[] = response.data;
      setNotes(fetchedNotes);
    } catch (e: any) {
      console.log(e.message);
    }
  }

  const addNewNote = (newNote: Note) => {
    //prepend the new note to the notes list
    setNotes((prevNotes) => (prevNotes ? [newNote, ...prevNotes] : [newNote]));
  };

  return (
    <div className="pt-6 w-10/12 flex flex-col items-center overflow-y-auto no-scrollbar">
      <div className="post bg-white p-4 w-4/5 mb-6 border rounded shadow">
        <h1 className="mb-1">Write a note for everyone to see</h1>
        <CreatePostForm addNewNote={addNewNote} />
      </div>
      {notes?.map((note) => (
        <Post key={note._id} username={note.username} content={note.content} />
      ))}
    </div>
  );
};

export default PostFeed;
