import React from 'react';
import NextImg from 'next/image';

type CommentProps = {
  avatarUrl: string;
  username?: string;
  comment: string;
  tags?: string[];
};

const Comment: React.FC<CommentProps> = ({
  avatarUrl,
  username = 'unknown',
  comment,
  tags = []
}) => {
  return (
    <div className="flex items-start space-x-3 my-3">
      <NextImg
        height={32}
        width={32}
        src={avatarUrl}
        alt="Avatar"
        className="w-10 h-10 object-cover rounded-full"
      />
      <div>
        <div className="flex items-center">
          <span className="font-semibold">@{username}</span>
        </div>
        <p>{comment}</p>
        <div className="flex flex-wrap mt-1">
          {tags.map((tag, index) => (
            <span key={index} className="text-sm text-gray-500 mr-1">
              #{tag},
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
