import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarMonth from '@mui/icons-material/CalendarMonth';

const VideoSummaries: React.FC = () => {
  return (
    <div className="py-4">
      <h1 className="text-xl font-semibold">
        消防士からWebエンジニアへ!! 私のキャリアの旅路
      </h1>
      <div className="text-gray-600 my-1">25年生 • 1998年 に誕生</div>
      <div className="my-1">
        カテゴリ: <span className="text-gray-600">#human</span>
      </div>
      <div className="flex space-x-4 mt-2">
        <div className="flex items-center">
          <span className="border rounded-full p-1">
            <FavoriteIcon className="text-xl text-black-500" />
          </span>
          <span className="ml-2 text-base">1998</span>
        </div>
        <div className="flex items-center">
          <span className="border rounded-full p-1">
            <CalendarMonth className="text-black-500" />
          </span>
          <span className="ml-2 text-base">8</span>
        </div>
      </div>
    </div>
  );
};

export default VideoSummaries;
