import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import back_arrow_icon from '../../assets/back_arrow_icon.png';

const Test = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();

  if (!videoId) return <p style={{ color: 'white' }}>Invalid YouTube link</p>;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.95)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        flexDirection: 'column',
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: '#b91c1c',
          border: 'none',
          padding: '10px',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img src={back_arrow_icon} alt="Back" style={{ width: '30px', height: '30px' }} />
      </button>

      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          width: '90%',
          height: '90%',
          maxWidth: '1400px',
          maxHeight: '800px',
          borderRadius: '10px',
        }}
      ></iframe>
    </div>
  );
};

export default Test;
