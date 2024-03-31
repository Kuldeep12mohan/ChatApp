import React, { useState } from 'react';
const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setLikes(likes + 1); // Increment likes by 1
  };

  const handleComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment(''); // Clear the input field after adding comment
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4 ">
      {post.image && (
        <div className="mb-4">
          <img src={post.image} alt="Post" className="w-full rounded-lg " />
        </div>
      )}
      <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
      <p className="mb-4">{post.content}</p>
      <div className="flex justify-between items-center mb-4">
        <button onClick={handleLike} className="text-blue-500">
          Like ({likes})
        </button>
        <button onClick={handleComment} className="text-blue-500">
          Comment
        </button>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Comments:</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index} className="mb-2">
              {comment}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <textarea
          rows="3"
          cols="50"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full border rounded-lg p-2 text-black"
        ></textarea>
      </div>
    </div>
  );
};

export default PostCard;
