'use client';
import { createContext, ReactNode, useState } from 'react';

type CommentContextProps = {
  comments: string[];
  setComment: (comments: string[] | []) => void;
  unshiftComment: (comment: string) => void;
  // 頭に追加
};

const CommentContext = createContext<CommentContextProps>(
  {} as CommentContextProps
);
const CommentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [comments, setComment] = useState<string[]>([]);

  // commentsにコメントを追加する関数
  const unshiftComment = (comment: string) => {
    setComment([comment, ...comments]);
  };

  return (
    <CommentContext.Provider value={{ comments, setComment, unshiftComment }}>
      {children}
    </CommentContext.Provider>
  );
};

export { CommentContext, CommentProvider };
