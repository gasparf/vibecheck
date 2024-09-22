import React from 'react';

const RecommendedSong = ({ song }) => {
  if (!song) return null;

  return (
    <div className="absolute bottom-[10%] left-[50%] transform translate-x-[-50%] z-10">
      <a
        href={`https://open.spotify.com/track/${song.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl font-bold bg-gray-700 p-3 rounded-lg shadow-lg"
      >
        {`Recommended Song: ${song.name}`}
      </a>
    </div>
  );
};

export default RecommendedSong;
