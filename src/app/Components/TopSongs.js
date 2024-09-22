import React from 'react';

const TopSongs = ({ topSongs }) => {
  return (
    <>
      <h2 className="text-center absolute top-[56%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] text-2xl font-semibold z-10">
        Your Top Songs
      </h2>

      <div className="text-center absolute top-[70%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] grid grid-cols-2 gap-4 max-w-lg z-10">
        {topSongs.map((song) => (
          <div key={song.id} className="flex items-center p-3 rounded-lg bg-gray-800 shadow-lg">
            <img
              src={song.album.images[0]?.url}
              alt={song.name}
              className="w-12 h-12 rounded-full mr-3 border-2 border-white"
            />
            <span className="font-semibold text-lg">{song.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default TopSongs;
