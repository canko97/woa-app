import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface PostProps {
  username: string;
  content: string;
}

const Post: React.FC<PostProps> = ({ username, content }) => {
  return (
    <div className="post bg-white p-4 w-4/5 mb-6 border rounded shadow">
      <h2 className="text-2xl font-semibold py-2">{username}</h2>
      <p>{content}</p>
    </div>
  );
};

export default Post;
