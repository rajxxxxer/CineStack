import React from 'react';
import back_arrow_icon from '../../assets/back_arrow_icon.png';

// 🔧 Function to extract video ID from full YouTube URL
const getYouTubeID = (url) => {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/);
  return match ? match[1] : null;
};

const Trailer = ({ trailerUrl, onClose }) => {
  if (!trailerUrl) return null;

  const videoId = getYouTubeID(trailerUrl); // 🔍 Extract ID

  if (!videoId) return <p className="text-white">Invalid YouTube link</p>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50">
      <button
        onClick={onClose}
        className="absolute top-4 left-4 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
      >
        <img src={back_arrow_icon} alt="Back" className="w-6 h-6" />
      </button>

      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Trailer;
