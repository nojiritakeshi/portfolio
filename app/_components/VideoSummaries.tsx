import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarMonth from '@mui/icons-material/CalendarMonth';

const VideoSummaries: React.FC = () => {
  // 1998年生まれから現在の年齢を計算
  const currentYear = new Date().getFullYear();
  const age = currentYear - 1998;
  return (
    <div className="py-3">
      <h1 className="text-xl font-semibold">
        消防士からWebエンジニアへ!! 私のキャリアの旅路
      </h1>
      <div className="text-gray-600 my-1">{age}年生 • 1998年 に誕生</div>
      <div className="my-1">
        カテゴリ: <span className="text-gray-600">#web developer</span>
      </div>
    </div>
  );
};

export default VideoSummaries;
