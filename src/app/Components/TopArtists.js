import React from 'react';

const TopArtists = ({ artists }) => {
  return (
    <>
      <h2 className="text-center absolute top-[23%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] text-2xl font-semibold z-10">
        Your Top Artists
      </h2>

      <div className="text-center absolute top-[35%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] grid grid-cols-2 gap-4 max-w-lg z-10">
        {artists.map((artist) => (
          <div key={artist.id} className="flex items-center p-3 rounded-lg bg-gray-800 shadow-lg">
            <img
              src={artist.images[0]?.url}
              alt={artist.name}
              className="w-12 h-12 rounded-full mr-3 border-2 border-white"
            />
            <span className="font-semibold text-lg">{artist.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default TopArtists;
