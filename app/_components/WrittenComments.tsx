'use client';
import { useContext } from 'react';
import { CommentContext } from './CommentProvider';
import Comment from './Comment';

const WrittenComments: React.FC = () => {
  const { comments } = useContext(CommentContext);

  return (
    <div className="w-full">
      {comments.length > 0 &&
        comments.map((comment, index) => (
          <div key={index}>
            <Comment avatarUrl="/job_programmer.png" comment={comment} />
          </div>
        ))}
    </div>
  );
};

export default WrittenComments;
