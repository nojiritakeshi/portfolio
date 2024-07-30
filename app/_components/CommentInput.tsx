'use client';
import React, { useContext, useState } from 'react';
import { CommentContext } from './CommentProvider';

const CommentInput: React.FC = () => {
  const { unshiftComment } = useContext(CommentContext);
  const [localComment, setLocalComment] = useState('');

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalComment(e.target.value);
  };

  const handleCancel = () => {
    setLocalComment('');
  };

  const handleSubmit = () => {
    unshiftComment(localComment);
    setLocalComment('');
  };

  return (
    <div className="sm:m-2 w-11/12">
      <input
        className="focus:outline-none border-b transition transform duration-500 focus:border-black focus:border-b-2 w-full p-1"
        placeholder="コメントする"
        value={localComment}
        onChange={(e) => handleCommentChange(e)}
      />
      <div className="flex justify-end items-center w-full mt-2">
        <button className="text-gray-500" onClick={handleCancel}>
          キャンセル
        </button>
        <button
          className="bg-gray-200 text-gray-500 px-5 py-2 ml-2 rounded-full"
          style={{
            backgroundColor: localComment.trim() ? '#065fd4' : '#0000000d',
            color: localComment.trim() ? '#fff' : '#000'
          }}
          onClick={handleSubmit}
          disabled={!localComment.trim()}
        >
          コメント
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
