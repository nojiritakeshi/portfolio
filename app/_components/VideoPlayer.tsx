import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  return (
    <div className="w-full">
      <iframe
        className="w-full h-96 rounded-xl"
        src={videoUrl}
        title="YouTube video player"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      {/* <iframe src={videoUrl} className="w-full h-full rounded-xl" /> */}
    </div>
  );
};

export default VideoPlayer;
